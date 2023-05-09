import { Injectable } from "@nestjs/common";
import { ResourceAPIService } from "../api";
import {
  ResourceCreateDTO,
  ResourceEntity,
  ResourceUpdateDTO,
} from "../models";
import { BaseMongoService } from "@cjp-back/mongo";

@Injectable()
export class ResourceService extends BaseMongoService<
  ResourceEntity,
  ResourceCreateDTO,
  ResourceUpdateDTO
> {
  constructor(private readonly api: ResourceAPIService) {
    super(api);
  }
}
