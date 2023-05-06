import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { SiteEntity } from "../models";
import { ComicSchemaName } from "../enums";

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource implements IResource {
  @Prop({ required: true })
  public link: string;

  @Prop({
    type: Number,
  })
  public type: ResourceType;

  @Prop({
    required: true,
  })
  public priority: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ComicSchemaName.COMICS_SITE,
    required: true,
    autopopulate: { select: "-__v" },
  })
  public siteData: SiteEntity;

  @Prop({
    default: null,
    type: Number,
  })
  public errorType: ResourceError;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
