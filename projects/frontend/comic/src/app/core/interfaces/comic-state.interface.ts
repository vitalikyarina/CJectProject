import { IArrayState } from "@cjp-front/state";
import { ComicEntity } from "../models";

export interface IComicState extends IArrayState<ComicEntity> {
  selectedId: string | null;
}
