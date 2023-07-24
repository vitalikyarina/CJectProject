import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { ComicSchemaName } from "../enums";
import { SiteModel } from "../models";

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource implements IResource {
  @Prop({ required: true })
  public path: string;

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
  public siteData: SiteModel;

  @Prop({
    default: null,
    type: Number,
  })
  public errorType: ResourceError;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);