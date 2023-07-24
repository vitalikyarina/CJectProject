import { ComicStatus, ComicTag } from "./enums";

export interface IComic {
  name: string;
  altNames: string[];
  resources: unknown[];
  chapters: unknown[];
  latestUpdate: number;
  tags: ComicTag[];
  status: ComicStatus;
  mainImage: string;
}
