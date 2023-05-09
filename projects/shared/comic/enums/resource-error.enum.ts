export const ResourceError = {
  LINK: 0,
} as const;

export type ResourceError = (typeof ResourceError)[keyof typeof ResourceError];
