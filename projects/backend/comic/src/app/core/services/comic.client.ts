import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { COMIC_MICROSERVICE } from "../tokens";
import { Observable, lastValueFrom } from "rxjs";
import { ComicCommand } from "../enums";
import {
  Comic,
  ComicCreateWithResourcesDTO,
  ComicUpdateDTO,
} from "../../modules";

@Injectable()
export class ComicClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_MICROSERVICE) protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  public getAllComics(): Promise<Comic[]> {
    return lastValueFrom(this.send<Comic[]>(ComicCommand.GET_ALL, {}));
  }

  public createComic(
    createData: ComicCreateWithResourcesDTO,
  ): Observable<Comic> {
    return this.send(ComicCommand.CREATE, createData);
  }

  public updateComic(id: string, updateData: ComicUpdateDTO): Promise<Comic> {
    return lastValueFrom(
      this.send(ComicCommand.UPDATE, {
        id,
        data: updateData,
      }),
    );
  }
}
