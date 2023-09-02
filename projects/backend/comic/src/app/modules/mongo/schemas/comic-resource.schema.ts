import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { SchemaName } from "../enums";
import { Site } from "./comic-site.schema";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource implements IResource {
  @ApiProperty({ nullable: false })
  public _id: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({ required: true })
  public path: string;

  @ApiProperty({ nullable: false, type: Number })
  @IsNotEmpty()
  @Prop({
    type: Number,
  })
  public type: ResourceType;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  public priority: number;

  @ApiProperty({ nullable: false })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemaName.COMICS_SITE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  public site: Site;

  @ApiProperty({ nullable: true, type: Number })
  @Prop({
    type: Number,
  })
  public errorType?: ResourceError;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);

export class ResourceCreateDTO extends OmitType(Resource, ["_id", "site"]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public site!: string;

  public _id?: string;
}

export class ResourceUpdateDTO extends PartialType(ResourceCreateDTO) {}
