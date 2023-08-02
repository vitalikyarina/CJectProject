import { IArrayState } from "@cjp-front/state";
import { ComicModel } from "../models";

export interface IComicState extends IArrayState<ComicModel> {
  selectedId: string | null;
}
