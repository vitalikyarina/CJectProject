import { Injectable } from "@nestjs/common";
import { ResourceAPI } from "../apis";
import { ResourceCreateDTO, ResourceModel, ResourceUpdateDTO } from "../models";
import { BaseMongoService } from "@cjp-back/mongo";

@Injectable()
export class ResourceService extends BaseMongoService<
  ResourceModel,
  ResourceCreateDTO,
  ResourceUpdateDTO
> {
  constructor(private readonly api: ResourceAPI) {
    super(api);
  }
}
