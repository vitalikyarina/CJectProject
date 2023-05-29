import { ISite } from "@cjp/shared/comic";

export class SiteEntity implements ISite {
  public _id!: string;

  public mainImagePath!: string;
  public chaptersPath!: string;
  public chapterNamePath!: string;
  public chapterDatePath!: string;
  public chapterImagesPath!: string;
  public chapterLazyLoadPath: string | undefined | null;
  public browserType: string | undefined | null;
  public name!: string;
  public baseLink!: string;
  public dateFormat!: string;
}

export type SiteCreateDTO = Omit<SiteEntity, "_id">;
export type SiteUpdateDTO = Partial<SiteCreateDTO>;
