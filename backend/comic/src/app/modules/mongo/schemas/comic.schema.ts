import { ComicStatus, ComicTag, IComic } from "@cjp/comic";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { SchemaName } from "../enums";
import { Transform } from "class-transformer";
import { HostStaticPath } from "@cjp-back/shared";
import {
  Resource,
  ResourceCreateDTO,
  ResourceUpdateDTO,
} from "./comic-resource.schema";
import { Chapter } from "./comic-chapter.schema";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export type ComicDocument = HydratedDocument<Comic>;

@Schema({})
export class Comic implements IComic {
  @ApiProperty({ nullable: false })
  public _id: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public name: string;

  @ApiProperty({ nullable: false })
  @IsArray()
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: SchemaName.COMICS_RESOURCE,
    default: [],
    autopopulate: { select: "-__v" },
  })
  public resources: Resource[];

  @ApiProperty({ nullable: false })
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: SchemaName.COMICS_CHAPTER,
    default: [],
    autopopulate: { select: "-__v" },
  })
  public chapters: Chapter[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop()
  public latestUpdate: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({
    default: [],
    type: [ComicTag],
  })
  public tags: ComicTag[];

  @ApiProperty({ nullable: false, type: Number })
  @IsNotEmpty()
  @Prop({
    default: ComicStatus.ONGOING,
    type: Number,
  })
  public status: ComicStatus;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @IsArray()
  @Prop({
    default: [],
    type: [String],
  })
  public altNames: string[];

  @ApiProperty({ nullable: false })
  @Prop()
  @Transform(({ value }) => `/${HostStaticPath.IMAGES}${value}`, {
    toPlainOnly: true,
  })
  postImage: string;

  constructor(partial: Partial<Comic>) {
    Object.assign(this, partial);
  }
}

export const ComicSchema = SchemaFactory.createForClass(Comic);

export class ComicCreateDTO extends PickType(Comic, ["name", "altNames"]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources: string[];

  constructor(comic: ComicCreateWithResourcesDTO) {
    super();
    this.name = comic.name;
    this.altNames = comic.altNames;
    this.resources = [];
  }
}

export class ComicCreateWithResourcesDTO extends PickType(Comic, [
  "name",
  "altNames",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources: ResourceCreateDTO[];

  constructor(comic: Partial<ComicCreateWithResourcesDTO> | ComicCreateDTO) {
    super();
    if (typeof comic === typeof ComicCreateDTO) {
      this.name = comic.name!;
      this.altNames = comic.altNames!;
      this.resources = [];
    } else {
      Object.assign(this, comic);
    }
  }
}

class ComicUpdate extends PickType(Comic, [
  "name",
  "altNames",
  "latestUpdate",
  "tags",
  "status",
  "postImage",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources!: string[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapters!: string[];
}

class ComicUpdateWithRes extends PickType(Comic, [
  "name",
  "altNames",
  "latestUpdate",
  "tags",
  "status",
  "postImage",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources!: ResourceUpdateDTO[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapters!: string[];
}

export class ComicUpdateDTO extends PartialType(ComicUpdate) {}

export class ComicUpdateWithResDTO extends PartialType(ComicUpdateWithRes) {}
