import { BaseClientProxy } from "@cjp-back/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { COMIC_MICROSERVICE } from "../tokens";
import { Observable } from "rxjs";
import { SiteCommand } from "../enums";
import { SiteModel } from "../models";

@Injectable()
export class SiteClientProxy extends BaseClientProxy {
  constructor(
    @Inject(COMIC_MICROSERVICE) protected readonly client: ClientProxy,
  ) {
    super(client);
  }

  public getAllSites(): Observable<SiteModel[]> {
    return this.send(SiteCommand.GET_ALL, {});
  }
}