export const ComicQueues = {
  COMIC: "comic",
} as const;

export type ComicQueues = (typeof ComicQueues)[keyof typeof ComicQueues];
