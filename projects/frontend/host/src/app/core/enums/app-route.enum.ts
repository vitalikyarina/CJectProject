export const AppRoute = {
  DEFAULT: "",
  COMICS: "comics",
} as const;

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];
