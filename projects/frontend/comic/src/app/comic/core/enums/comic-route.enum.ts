export const EDIT_COMIC_ID = "comic_id";

export const ComicRoute = {
  DEFAULT: "",
  CREATE: "create",
  EDIT: `edit/:${EDIT_COMIC_ID}`,
  SITES: "site",
} as const;

export type ComicRoute = (typeof ComicRoute)[keyof typeof ComicRoute];
