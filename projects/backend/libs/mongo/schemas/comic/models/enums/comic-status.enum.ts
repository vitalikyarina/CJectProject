export const ComicStatus = {
  ONGOING: "ONGOING",
  COMPLETE: "COMPLETE",
  BAD: "BAD",
} as const;

export type ComicStatus = (typeof ComicStatus)[keyof typeof ComicStatus];
