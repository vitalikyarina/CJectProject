export const ComicController = {
  COMIC: "comics",
  COMIC_SITES: "comic-sites",
} as const;

export type ComicController =
  (typeof ComicController)[keyof typeof ComicController];
