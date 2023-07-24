import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { SiteEntity } from "./comic-site.entity";

export class ResourceEntity implements IResource {
  public _id!: string;
  public path!: string;
  public type!: ResourceType;
  public priority!: number;
  public siteData!: SiteEntity;
  public errorType!: ResourceError;
}

export type ResourceDTO = Pick<ResourceEntity, "path" | "type" | "priority"> & {
  siteData: string;
  _id: string | null | undefined;
};

export class ResourceAdapter {
  public static REtoRDTO(value: ResourceEntity): ResourceDTO {
    const adaptValue: ResourceDTO = {
      _id: value._id,
      path: value.path,
      priority: value.priority,
      siteData: value.siteData._id,
      type: value.type,
    };

    return adaptValue;
  }
}
