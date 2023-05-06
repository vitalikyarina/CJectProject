export const ComicError = {
  WRONG_LINK: "LINK",
  NO_IMAGES: "images",
} as const;

export type ComicError = (typeof ComicError)[keyof typeof ComicError];
