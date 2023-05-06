export const ResourceType = {
  RAW: "raw",
  DEFAULT: "default",
} as const;

export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
