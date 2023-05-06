export const ResourceError = {
  LINK: "LINK",
} as const;

export type ResourceError = (typeof ResourceError)[keyof typeof ResourceError];
