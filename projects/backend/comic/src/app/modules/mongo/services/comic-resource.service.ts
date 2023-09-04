import { Inject, Injectable } from "@nestjs/common";
import { ResourceAPI } from "../apis";
import { BaseMongoService } from "@cjp-back/mongo";
import { Resource, ResourceCreateDTO, ResourceUpdateDTO } from "../schemas";

@Injectable()
export class ResourceService extends BaseMongoService<
  Resource,
  ResourceCreateDTO,
  ResourceUpdateDTO
> {
  @Inject() protected override readonly api: ResourceAPI;
}
