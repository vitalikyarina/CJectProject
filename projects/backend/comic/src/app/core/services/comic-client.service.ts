import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { COMIC_MICROSERVICE } from "../tokens";
import { Observable } from "rxjs";
import { ComicEntity } from "@cjp-back/mongo/comic";
import { ComicCommand } from "../enums";

@Injectable()
export class ComicClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_MICROSERVICE) protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  public getAll(): Observable<ComicEntity[]> {
    return this.send(ComicCommand.GET_ALL, {});
  }
}
