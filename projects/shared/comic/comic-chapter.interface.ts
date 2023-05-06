import { ChapterError } from "./enums";

export interface IChapter {
  number: number;
  link: string;
  date: number;
  resource: unknown;
  countPage: number;
  isLoaded: boolean;
  errorPages: Record<number, boolean>;
  errorType: ChapterError;
}
