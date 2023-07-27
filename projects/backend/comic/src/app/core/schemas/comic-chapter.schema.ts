import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ChapterError, IChapter } from "@cjp/shared/comic";
import { ComicSchemaName } from "../enums";
import { ResourceModel } from "../models";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter implements IChapter {
  @Prop({ required: true })
  public path: string;

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
    type: Number,
  })
  public errorType: ChapterError;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ComicSchemaName.COMICS_RESOURCE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  public resource: ResourceModel;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
