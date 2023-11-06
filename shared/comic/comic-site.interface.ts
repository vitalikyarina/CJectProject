export interface ISite {
  postImagePath: string;
  chaptersPath: string;
  chapterNamePath: string;
  chapterDatePath: string;
  chapterImagesPath: string;
  chapterLazyLoadPath?: string;
  browserType?: string;
  name: string;
  baseLink: string;
  dateFormat: string;
}
