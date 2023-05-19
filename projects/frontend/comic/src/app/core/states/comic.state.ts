import { Selector, State, StateToken } from "@ngxs/store";
import { ComicEntity, IComicState } from "..";
import { Injectable } from "@angular/core";

export const COMIC_STATE_TOKEN = new StateToken<IComicState>("comic");

@State<IComicState>({
  name: COMIC_STATE_TOKEN,
  defaults: {
    comics: [],
    sites: [],
  },
})
@Injectable()
export class ComicState {
  @Selector([COMIC_STATE_TOKEN])
  public static comics(state: IComicState): ComicEntity[] {
    return state.comics;
  }
}
