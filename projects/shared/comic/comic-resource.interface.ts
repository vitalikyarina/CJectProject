import { ResourceError, ResourceType } from "./enums";

export interface IResource {
  link: string;
  type: ResourceType;
  siteData: unknown;
  priority: number;
  errorType: ResourceError;
}
