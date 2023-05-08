import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { SiteEntity } from "./comic-site.entity";

export class ResourceEntity implements IResource {
  public _id!: string;
  public link!: string;
  public type!: ResourceType;
  public priority!: number;
  public siteData!: SiteEntity;
  public errorType!: ResourceError;
}

export type ResourceCreateDTO = Pick<
  ResourceEntity,
  "link" | "type" | "priority"
> & { siteData: string };

export type ResourceUpdateDTO = Pick<
  ResourceEntity,
  "link" | "type" | "_id" | "priority"
> & { siteData: string };
