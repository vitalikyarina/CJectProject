import { ResourceError, ResourceType } from "./enums";

export interface IResource {
  path: string;
  type: ResourceType;
  site: unknown;
  priority: number;
  errorType: ResourceError | undefined | null;
}
