import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ISite } from "@cjp/shared/comic";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export type SiteDocument = HydratedDocument<Site>;
@Schema()
export class Site implements ISite {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public postImagePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public chaptersPath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public chapterNamePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public chapterDatePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public chapterImagesPath: string;

  @ApiProperty({ required: false })
  @Prop()
  public chapterLazyLoadPath?: string;

  @ApiProperty({ required: false })
  @Prop()
  public browserType?: string;

  @ApiProperty({ nullable: false })
  @Prop({ required: true })
  public name: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public baseLink: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public dateFormat: string;

  constructor(partial: Partial<Site>) {
    Object.assign(this, partial);
  }
}

export const SiteSchema = SchemaFactory.createForClass(Site);

export class SiteCreateDTO extends OmitType(Site, ["_id"]) {}

export class SiteUpdateDTO extends PartialType(SiteCreateDTO) {}
