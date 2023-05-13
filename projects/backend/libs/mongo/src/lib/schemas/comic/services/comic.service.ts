import { Injectable } from "@nestjs/common";
import { ComicAPIService } from "../api";
import {
  ComicCreateDTO,
  ComicCreateWithResourcesDTO,
  ComicEntity,
  ComicUpdateDTO,
} from "../models";
import { ConfigService } from "@nestjs/config";
import { FilterQuery } from "mongoose";
import { Observable, defer, forkJoin, map, switchMap } from "rxjs";
import { BaseMongoService } from "@cjp-back/mongo";
import { ResourceService } from "./comic-resource.service";
import { FSHelperService, IFindOptions } from "@cjp-back/shared";

@Injectable()
export class ComicService extends BaseMongoService<
  ComicEntity,
  ComicCreateDTO,
  ComicUpdateDTO
> {
  protected comicDir: string;

  constructor(
    private readonly api: ComicAPIService,
    private readonly resourceService: ResourceService,
    private readonly config: ConfigService,
    private readonly fsHelper: FSHelperService,
  ) {
    super(api);

    this.comicDir = this.config.get("IMAGE_PATH")!;
  }

  public createOneWithResources(
    comic: ComicCreateWithResourcesDTO,
  ): Observable<ComicEntity> {
    return forkJoin(
      comic.resources.map((res) => {
        return this.resourceService.createOne(res);
      }),
    ).pipe(
      map((resources) => {
        return resources.map((res) => res._id as string);
      }),
      switchMap((resIds) => {
        const newComic: ComicCreateDTO = new ComicCreateDTO(comic);
        newComic.resources = resIds;
        return defer(() => {
          return this.api.createOne(newComic);
        });
      }),
    );
  }

  public override find(
    queryConditions?: FilterQuery<ComicEntity>,
    options?: IFindOptions,
  ): Observable<ComicEntity> {
    return super
      .find(queryConditions, options)
      .pipe(map((comic) => this.addMainImages(comic)));
  }

  public override findById(id: string): Observable<ComicEntity> {
    return super.findById(id).pipe(map((comic) => this.addMainImages(comic)));
  }

  // public override updateOneById(
  //   id: string,
  //   comic: ComicUpdateDTO,
  // ): Observable<ComicEntity> {
  //   const resources = comic.resources;
  //   return this.findById(id).pipe(
  //     switchMap((foundComic) => {
  //       const newResource = resources.filter((res: IComicResource) => !res._id);
  //       console.log(newResource);
  //       return of(foundComic);
  //     }),
  //   );
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
  //}

  private addMainImages(comic: ComicEntity): ComicEntity {
    const mainImageDir = `${this.comicDir}\\comics\\${comic._id}\\main`;
    comic.mainImages = this.fsHelper
      .getFilesFromDir(mainImageDir)
      .map((img) => `assets/comics/${comic._id}/main/${img}`);
    return comic;
  }
}
