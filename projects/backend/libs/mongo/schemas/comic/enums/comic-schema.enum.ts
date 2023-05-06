export const ComicSchema = {
  COMIC: "comic",
  COMICS_SITE: "comic_sites",
  COMICS_CHAPTER: "comic_chapters",
  COMICS_RESOURCE: "comic_resources",
} as const;

export type ComicSchema = (typeof ComicSchema)[keyof typeof ComicSchema];
