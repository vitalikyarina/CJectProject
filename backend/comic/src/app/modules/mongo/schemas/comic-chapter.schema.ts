import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ChapterError, IChapter } from "@cjp/comic";
import { SchemaName } from "../enums";
import { Resource } from "./comic-resource.schema";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter implements IChapter {
  @ApiProperty({ nullable: false })
  public _id: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  path: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  number: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop()
  countPage: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({
    default: false,
  })
  isLoaded: boolean;

  @ApiProperty({ nullable: false })
  @Expose()
  public get isError(): boolean {
    if (this.errorPages) {
      return true;
    }
    return false;
  }

  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  @Prop({
    type: raw({}),
  })
  errorPages: Record<number, boolean>;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  date: number;

  @ApiProperty({ nullable: true, type: Number })
  @IsNotEmpty()
  @Prop({
    type: Number,
  })
  errorType: ChapterError;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.COMICS_RESOURCE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  resource: Resource;

  @ApiProperty({ nullable: false })
  public images: string[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);

export class ChapterCreateDTO extends PickType(Chapter, [
  "number",
  "path",
  "date",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: string;
}
export class ChapterScrapingDTO extends PickType(Chapter, [
  "number",
  "path",
  "date",
  "resource",
]) {}

class ChapterUpdate extends PickType(Chapter, [
  "path",
  "date",
  "countPage",
  "isLoaded",
  "errorType",
  "errorPages",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: string;
}

export class ChapterUpdateDTO extends PartialType(ChapterUpdate) {}
