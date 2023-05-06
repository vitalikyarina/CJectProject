import { ResourceError, ResourceType } from "./enums";

export interface IComicResource {
  link: string;
  type: ResourceType;
  siteData: unknown;
  priority: number;
  errorType: ResourceError;
}
