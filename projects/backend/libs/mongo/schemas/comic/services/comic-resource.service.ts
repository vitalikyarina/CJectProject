import { Injectable } from "@nestjs/common";
import { ComicResourceAPIService } from "../api";
import {
  ComicResourceCreateDTO,
  ComicResourceEntity,
  ComicResourceUpdateDTO,
} from "../models";
import { BaseMongoService } from "@cjp-back/mongo";

@Injectable()
export class ComicResourceService extends BaseMongoService<
  ComicResourceEntity,
  ComicResourceCreateDTO,
  ComicResourceUpdateDTO
> {
  constructor(private readonly api: ComicResourceAPIService) {
    super(api);
  }
}
