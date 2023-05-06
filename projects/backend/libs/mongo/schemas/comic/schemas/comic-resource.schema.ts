import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IComicResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { ComicSiteEntity } from "../models";
import { ComicSchema } from "../enums";

export type ComicResourceDocument = HydratedDocument<ComicResource>;

@Schema()
export class ComicResource implements IComicResource {
  @Prop({ required: true })
  public link: string;

  @Prop({
    type: String,
  })
  public type: ResourceType;

  @Prop({
    required: true,
  })
  public priority: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ComicSchema.COMICS_SITE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  public siteData: ComicSiteEntity;

  @Prop({
    default: null,
    type: String,
  })
  public errorType: ResourceError;
}

export const ComicResourceSchema = SchemaFactory.createForClass(ComicResource);
