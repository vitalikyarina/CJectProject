import { ISite } from "@cjp/shared/comic";

export class SiteModel implements ISite {
  public _id!: string;

  public postImagePath!: string;
  public chaptersPath!: string;
  public chapterNamePath!: string;
  public chapterDatePath!: string;
  public chapterImagesPath!: string;
  public chapterLazyLoadPath?: string;
  public browserType?: string;
  public name!: string;
  public baseLink!: string;
  public dateFormat!: string;
}

export type SiteCreateDTO = Omit<SiteModel, "_id">;
export type SiteUpdateDTO = Partial<SiteCreateDTO>;
