export const ChapterError = {
  WRONG_LINK: "LINK",
  NO_IMAGES: "images",
} as const;

export type ChapterError = (typeof ChapterError)[keyof typeof ChapterError];
