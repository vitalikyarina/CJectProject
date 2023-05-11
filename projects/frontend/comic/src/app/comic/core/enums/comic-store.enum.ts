export const ComicsStore = {
  COMIC: "COMIC",
  COMIC_SITE: "COMIC_SITE",
} as const;

export type ComicsStore = (typeof ComicsStore)[keyof typeof ComicsStore];
