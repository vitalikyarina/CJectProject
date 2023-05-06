export const ComicSchema = {
  COMIC: "comic",
  COMICS_SITE: "comics_site",
  COMICS_CHAPTER: "comics_chapter",
  COMICS_RESOURCE: "comics_resource",
} as const;

export type ComicSchema = (typeof ComicSchema)[keyof typeof ComicSchema];
