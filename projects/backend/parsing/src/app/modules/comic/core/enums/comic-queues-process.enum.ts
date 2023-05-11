export const ComicQueuesProcess = {
  COMIC_PARSING: "comicParsing",
  COMIC_RESOURCE_PARSING: "comicResourceParsing",
  COMIC_CHAPTER_PARSING: "comicChapterParsing",
};

export type ComicQueuesProcess =
  (typeof ComicQueuesProcess)[keyof typeof ComicQueuesProcess];
