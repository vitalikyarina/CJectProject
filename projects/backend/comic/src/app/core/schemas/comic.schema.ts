import { ComicStatus, ComicTag, IComic } from "@cjp/shared/comic";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ComicSchemaName } from "../enums";
import { ChapterModel, ResourceModel } from "../models";

export type ComicDocument = HydratedDocument<Comic>;

@Schema()
export class Comic implements IComic {
  @Prop({ required: true })
  public name: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: ComicSchemaName.COMICS_RESOURCE,
    default: [],
    autopopulate: { select: "-__v" },
  })
  public resources: ResourceModel[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: ComicSchemaName.COMICS_CHAPTER,
    default: [],
    autopopulate: { select: "-__v" },
  })
  public chapters: ChapterModel[];

  @Prop()
  public latestUpdate: number;

  @Prop({
    default: [],
    type: [ComicTag],
  })
  public tags: ComicTag[];

  @Prop({
    default: ComicStatus.ONGOING,
    type: String,
  })
  public status: ComicStatus;

  @Prop({
    default: [],
    type: [String],
  })
  public altNames: string[];
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
