import { ChapterScrapingDTO } from "@cjp-back/comic";

export interface ScrapingData {
  postImage?: string;
  chapters: ChapterScrapingDTO[];
}
