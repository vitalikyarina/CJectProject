import { Injectable } from "@nestjs/common";
import { ComicAPI } from "../apis";
import {
  ComicCreateDTO,
  ComicCreateWithResourcesDTO,
  ComicModel,
  ComicUpdateDTO,
} from "../models";
import { BaseMongoService } from "@cjp-back/mongo";
import { ResourceService } from "./comic-resource.service";
import { HostStaticPath, IFindOptions } from "@cjp-back/shared";
import { FilterQuery } from "mongoose";

@Injectable()
export class ComicService extends BaseMongoService<
  ComicModel,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  constructor(
    private readonly api: ComicAPI,
    private readonly resourceService: ResourceService,
  ) {
    super(api);
  }

  public async createOneWithResources(
    comic: ComicCreateWithResourcesDTO,
  ): Promise<ComicModel> {
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

    return this.api.createOne(newComic);
  }

  public override async find(
    queryConditions?: FilterQuery<ComicModel>,
    options?: IFindOptions,
  ): Promise<ComicModel[]> {
    const comics = await super.find(queryConditions, options);

    comics.map((comic) => {
      if (comic.postImage) {
        comic.postImage = `/${HostStaticPath.IMAGES}` + comic.postImage;
      }
    });

    return comics;
  }

  // public override updateOneById(
  //   id: string,
  //   comic: ComicUpdateDTO,
  // ): Observable<ComicModel> {
  //   // const resources = comic.resources;
  //   // console.log(comic);

  //   // const comicUpdate: ComicUpdateDTO = {
  //   //   name: comic.name,
  //   // };

  //   return this.api
  //     .updateOneById(id, comic)
  //     .pipe
  //     // switchMap(() => {
  //     //   return this.findById(id);
  //     // }),
  //     ();

  // this.findById(id).pipe(
  //   switchMap((foundComic) => {
  //     const newResource = resources.filter((res: IComicResource) => !res._id);
  //     console.log(newResource);
  //     return of(foundComic);
  //   }),
  // );
  // return forkJoin(
  //   comic.resources.map((res) => {
  //     return this.comicResourceService.createOne(res);
  //   }),
  // ).pipe(
  //   map((resources) => {
  //     return resources.map((res) => res._id as string);
  //   }),
  //   switchMap((resIds) => {
  //     const newComic = comic;
  //     newComic.resources = resIds;
  //     return defer(() => {
  //       return this.apiComic.updateOneById(id, comic);
  //     });
  //   }),
  // );
  // map((comic) => {
  //   const mainImageDir = `${this.comicDir}\\${comic._id}\\main`;
  //   comic.mainImages = this.fsHelper
  //     .getFilesFromDir(mainImageDir)
  //     .map((img) => `assets/${comic._id}/main/${img}`);
  //   return comic;
  // }),
}
