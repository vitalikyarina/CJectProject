import { ChapterError, IChapter } from "@cjp/shared/comic";
import { ResourceModel } from "./comic-resource.model";

export class ChapterModel implements IChapter {
  public _id!: string;
  public number!: number;
  public path!: string;
  public countPage!: number;
  public isLoaded!: boolean;
  public isError!: boolean;
  public errorPages!: Record<number, boolean>;
  public date!: number;
  public resource!: ResourceModel;
  public errorType!: ChapterError;
  public images!: string[];
}
