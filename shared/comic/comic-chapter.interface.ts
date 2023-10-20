import { ChapterError } from "./enums";

export interface IChapter {
  number: number;
  path: string;
  date: number;
  resource: unknown;
  countPage: number;
  isLoaded: boolean;
  errorPages: Record<number, boolean>;
  errorType: ChapterError;
}
