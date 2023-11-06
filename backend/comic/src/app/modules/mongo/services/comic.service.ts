import { Inject, Injectable } from "@nestjs/common";
import { ComicAPI } from "../apis";
import { BaseMongoService } from "@cjp-back/mongo";
import { ResourceService } from "./comic-resource.service";
import { FSService, QueryFindOptions } from "@cjp-back/shared";
import { FilterQuery } from "mongoose";
import { ChapterService } from "./comic-chapter.service";
import {
  Chapter,
  Comic,
  ComicCreateDTO,
  ComicCreateWithResourcesDTO,
  ComicUpdateDTO,
  ComicUpdateWithResDTO,
  Resource,
  ResourceUpdateDTO,
} from "../schemas";
import { EnvironmentService } from "../../environment";

@Injectable()
export class ComicService extends BaseMongoService<
  Comic,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  @Inject() private readonly resourceService: ResourceService;
  @Inject() private readonly chapterService: ChapterService;
  @Inject() private readonly fs: FSService;
  @Inject() private readonly env: EnvironmentService;
  @Inject() protected override readonly api: ComicAPI;

  async createOneWithResources(
    comic: ComicCreateWithResourcesDTO,
    options?: QueryFindOptions,
  ): Promise<Comic> {
    const resources: string[] = [];

    for (let i = 0; i < comic.resources.length; i++) {
      const resource = comic.resources[i];
      if (!resource._id) {
        delete resource._id;
      }
      const resourceId = await this.resourceService.createOne(resource);
      resources.push(resourceId._id);
    }

    const newComic: ComicCreateDTO = new ComicCreateDTO(comic);
    newComic.resources = resources;

    return this.api.createOne(newComic, options);
  }

  override async find(
    queryConditions?: FilterQuery<Comic>,
    options?: QueryFindOptions,
  ): Promise<Comic[]> {
    const comics = await super.find(queryConditions, options);

    return comics;
  }

  async updateOneByIdWithRes(
    id: string,
    updateData: ComicUpdateWithResDTO,
  ): Promise<Comic> {
    const comic = await super.findById(id, {
      populate: [{ path: "resources" }],
    });

    const deletingResourceIds = this.getDeletingResourceIds(
      comic.resources,
      updateData.resources!,
    );

    await this.deleteResourceByIds(deletingResourceIds);

    const deletedChaptersIds = await this.deleteChaptersByResourceIds(
      comic,
      deletingResourceIds,
    );

    const newChapterIds = this.getNewChaptersIds(
      comic.chapters,
      deletedChaptersIds,
    );

    const resourceIds: string[] = await this.getNewResourceIds(
      updateData.resources!,
    );

    await this.updateById(id, {
      resources: resourceIds,
      chapters: newChapterIds,
      altNames: updateData.altNames,
      name: updateData.name,
    });

    return super.findById(id);
  }

  private getDeletingResourceIds(
    resources: Resource[],
    newResources: ResourceUpdateDTO[],
  ): string[] {
    const foundIds = [];
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];

      const updatedIndex = newResources.findIndex((res) => {
        return res?._id?.toString() === resource._id.toString();
      });
      if (updatedIndex === -1) {
        foundIds.push(resource._id.toString());
      }
    }
    return foundIds;
  }

  private async getNewResourceIds(
    resources: ResourceUpdateDTO[],
  ): Promise<string[]> {
    const resourceIds = [];
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      if (!resource._id) {
        delete resource._id;
        const createdResource = await this.resourceService.createOne({
          site: resource.site!,
          path: resource.path!,
          priority: resource.priority!,
          type: resource.type!,
        });
        resourceIds.push(createdResource._id.toString());
      } else {
        await this.resourceService.updateOne(
          { _id: resource._id },
          {
            site: resource.site,
            path: resource.path,
            priority: resource.priority,
            type: resource.type,
          },
        );
        resourceIds.push(resource._id.toString());
      }
    }

    return resourceIds;
  }

  private async deleteResourceByIds(resourceIds: string[]): Promise<void> {
    for (let i = 0; i < resourceIds.length; i++) {
      const id = resourceIds[i];
      await this.resourceService.deleteById(id);
    }
  }

  private async deleteChaptersByResourceIds(
    comic: Comic,
    resourceIds: string[],
  ): Promise<string[]> {
    const comicFolder = `${this.env.IMAGE_FOLDER}/comics/${comic._id}/`;

    const chapterIds = [];

    for (let i = 0; i < resourceIds.length; i++) {
      const id = resourceIds[i];
      const chapters = await this.chapterService.deleteChaptersByResourceId(id);

      for (let j = 0; j < chapters.length; j++) {
        const chapter = chapters[j];
        const chapterFolder = comicFolder + chapter.number;
        chapterIds.push(chapter._id.toString());

        if (this.fs.existsFile(chapterFolder)) {
          this.fs.deleteFolder(chapterFolder);
        }
      }
    }

    return chapterIds;
  }

  private getNewChaptersIds(
    chapters: Chapter[],
    chapterIds: string[],
  ): string[] {
    const foundIds = [];

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];

      const foundIndex = chapterIds.findIndex((chp) => {
        return chp === chapter._id.toString();
      });

      if (foundIndex === -1) {
        foundIds.push(chapter._id.toString());
      }
    }

    return foundIds;
  }

  // async getComics(
  //   queryConditions?: FilterQuery<Comic>,
  //   options?: IFindOptions,
  // ): void {}
}
