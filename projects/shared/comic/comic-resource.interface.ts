import { ResourceError, ResourceType } from "./enums";

export interface IResource {
  path: string;
  type: ResourceType;
  siteData: unknown;
  priority: number;
  errorType: ResourceError | undefined | null;
}
