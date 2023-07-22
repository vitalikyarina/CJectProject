import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { COMIC_MICROSERVICE } from "../tokens";
import { Observable } from "rxjs";
import { ComicCommand } from "../enums";
import { ComicCreateWithResourcesDTO, ComicModel } from "../models";

@Injectable()
export class ComicClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_MICROSERVICE) protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  public getAllComics(): Observable<ComicModel[]> {
    return this.send(ComicCommand.GET_ALL, {});
  }

  public createComic(
    createData: ComicCreateWithResourcesDTO,
  ): Observable<ComicModel> {
    return this.send(ComicCommand.CREATE, createData);
  }
}
