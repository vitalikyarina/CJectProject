export const ComicsApi = {
  COMIC_SITE: "comic-sites",
  COMICS: "comics",
} as const;

export type ComicsApi = (typeof ComicsApi)[keyof typeof ComicsApi];
