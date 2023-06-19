import { ComicStatus, ComicTag, IComic } from "@cjp/shared/comic";
import { ResourceDTO, ResourceEntity } from "./comic-resource.entity";
import { ChapterEntity } from "./comic-chapter.entity";

export class ComicEntity implements IComic {
  public _id!: string;
  public name!: string;
  public altNames!: string[];
  public resources!: ResourceEntity[];
  public chapters!: ChapterEntity[];
  public latestUpdate!: number;
  public tags!: ComicTag[];
  public status!: ComicStatus;
  public mainImages!: string[];
}

export type ComicDTO = Pick<ComicEntity, "name" | "altNames"> & {
  resources: ResourceDTO[];
};
