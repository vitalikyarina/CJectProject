import { ComicStatus, ComicTag, IComic } from "@cjp/comic";
import { ResourceDTO, ResourceModel } from "./comic-resource.model";
import { ChapterModel } from "./comic-chapter.model";

export class ComicModel implements IComic {
  public _id!: string;
  public name!: string;
  public altNames!: string[];
  public resources!: ResourceModel[];
  public chapters!: ChapterModel[];
  public latestUpdate!: number;
  public tags!: ComicTag[];
  public status!: ComicStatus;
  public postImage!: string;
}

export type ComicDTO = Pick<ComicModel, "name" | "altNames"> & {
  resources: ResourceDTO[];
};
