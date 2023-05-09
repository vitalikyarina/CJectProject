export const ComicControllerName = {
  COMIC: "comics",
  COMIC_SITES: "comic-sites",
} as const;

export type ComicControllerName =
  (typeof ComicControllerName)[keyof typeof ComicControllerName];
