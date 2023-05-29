import { ComicEntity, SiteEntity } from "../models";

export interface IComicState {
  comics: ComicEntity[];
  sites: SiteEntity[];
}
