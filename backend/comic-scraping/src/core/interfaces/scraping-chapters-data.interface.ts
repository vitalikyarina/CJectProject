import { ChapterCreateDTO } from "@cjp-back/comic";

export interface ScrapingChaptersData {
  newChapters: ChapterCreateDTO[];
  oldChapters: { id: string; number: number }[];
}
