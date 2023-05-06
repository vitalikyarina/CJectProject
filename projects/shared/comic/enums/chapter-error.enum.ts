export const ChapterError = {
  WRONG_LINK: 0,
  NO_IMAGES: 1,
} as const;

export type ChapterError = (typeof ChapterError)[keyof typeof ChapterError];
