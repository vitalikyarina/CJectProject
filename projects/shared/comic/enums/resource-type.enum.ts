export const ResourceType = {
  DEFAULT: 0,
  RAW: 1,
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
