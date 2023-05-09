export const ComicStatus = {
  ONGOING: 0,
  COMPLETE: 1,
  BAD: 2,
} as const;

export type ComicStatus = (typeof ComicStatus)[keyof typeof ComicStatus];
