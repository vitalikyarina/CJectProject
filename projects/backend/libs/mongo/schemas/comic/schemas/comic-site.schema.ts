import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IComicSite } from "@cjp/shared/comic";

export type ComicSiteDocument = HydratedDocument<ComicSite>;
@Schema()
export class ComicSite implements IComicSite {
  @Prop({ required: true })
  public mainImagePath: string;

  @Prop({ required: true })
  public chaptersPath: string;

  @Prop({ required: true })
  public chapterNamePath: string;

  @Prop({ required: true })
  public chapterDatePath: string;

  @Prop({ required: true })
  public chapterImagesPath: string;

  @Prop()
  public chapterLazyLoadPath: string | undefined | null;

  @Prop()
  public browserType: string | undefined | null;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public baseLink: string;

  @Prop({ required: true })
  public dateFormat: string;

  constructor() {}
}

export const ComicSiteSchema = SchemaFactory.createForClass(ComicSite);
