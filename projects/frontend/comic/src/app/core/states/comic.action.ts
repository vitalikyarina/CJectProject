import { ComicStateName } from "../enums";

export class LoadComics {
  public static readonly type = `[${ComicStateName.COMIC}] Load`;
  constructor() {}
}

export class LoadSites {
  public static readonly type = `[${ComicStateName.SITE}] Load`;
  constructor() {}
}
