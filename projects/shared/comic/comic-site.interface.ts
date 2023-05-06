export interface ISite {
  mainImagePath: string;
  chaptersPath: string;
  chapterNamePath: string;
  chapterDatePath: string;
  chapterImagesPath: string;
  chapterLazyLoadPath: string | undefined | null;
  browserType: string | undefined | null;
  name: string;
  baseLink: string;
  dateFormat: string;
}
