export const ComicSchema = {
  COMIC: "comic",
  COMICS_SITE: "comic_site",
  COMICS_CHAPTER: "comic_chapter",
  COMICS_RESOURCE: "comic_resource",
} as const;

export type ComicSchema = (typeof ComicSchema)[keyof typeof ComicSchema];
