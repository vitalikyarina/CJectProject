import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { SiteModel } from "./comic-site.model";

export class ResourceModel implements IResource {
  public _id!: string;
  public path!: string;
  public type!: ResourceType;
  public priority!: number;
  public site!: SiteModel;
  public errorType!: ResourceError;
}

export type ResourceDTO = Pick<ResourceModel, "path" | "type" | "priority"> & {
  site: string;
  _id: string | null | undefined;
};

export class ResourceAdapter {
  public static REtoRDTO(value: ResourceModel): ResourceDTO {
    const adaptValue: ResourceDTO = {
      _id: value._id,
      path: value.path,
      priority: value.priority,
      site: value.site._id,
      type: value.type,
    };

    return adaptValue;
  }
}
