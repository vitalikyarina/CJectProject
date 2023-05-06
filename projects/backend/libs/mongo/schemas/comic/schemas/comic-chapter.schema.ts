import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ResourceEntity } from "../models";
import { ComicError, IChapter } from "@cjp/shared/comic";
import { ComicSchema } from "../enums";
export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter implements IChapter {
  @Prop({ required: true })
  public link: string;

  @Prop({ required: true })
  public number: number;

  @Prop()
  public countPage: number;

  @Prop({
    default: false,
  })
  public isLoaded: boolean;

  @Prop({
    default: null,
    type: raw({}),
  })
  public errorPages: Record<number, boolean>;

  @Prop({ required: true })
  public date: number;

  @Prop({
    default: null,
    type: String,
  })
  public errorType: ComicError;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ComicSchema.COMICS_RESOURCE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  public resource: ResourceEntity;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
