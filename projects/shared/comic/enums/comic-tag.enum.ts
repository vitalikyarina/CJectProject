export const ComicTag = {} as const;

export type ComicTag = (typeof ComicTag)[keyof typeof ComicTag];
