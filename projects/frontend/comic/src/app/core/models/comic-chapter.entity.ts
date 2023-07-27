import { ChapterError, IChapter } from "@cjp/shared/comic";
import { ResourceEntity } from "./comic-resource.entity";

export class ChapterEntity implements IChapter {
  public _id!: string;
  public number!: number;
  public path!: string;
  public countPage!: number;
  public isLoaded!: boolean;
  public isError!: boolean;
  public errorPages!: Record<number, boolean>;
  public date!: number;
  public resource!: ResourceEntity;
  public errorType!: ChapterError;
  public images!: string[];
}
