import { Module } from "@nestjs/common";
import { Environment } from "../../core";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { SharedModule } from "@cjp-back/shared";
import { SchemaName } from "./enums";
import {
  ChapterSchema,
  ComicSchema,
  ResourceSchema,
  SiteSchema,
} from "./schemas";
import { ChapterAPI, ComicAPI, ResourceAPI, SiteAPI } from "./apis";
import {
  ChapterService,
  ComicService,
  EnvironmentService,
  ResourceService,
  SiteService,
} from "./services";

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        mongoose.plugin(mongooseAutoPopulate);
        return {
          uri: configService.get(Environment.MONGO_URL),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: SchemaName.COMICS_SITE,
        useFactory: () => {
          return SiteSchema;
        },
      },
      {
        name: SchemaName.COMICS_RESOURCE,
        useFactory: () => {
          return ResourceSchema;
        },
      },
      {
        name: SchemaName.COMICS_CHAPTER,
        useFactory: () => {
          return ChapterSchema;
        },
      },
      {
        name: SchemaName.COMIC,
        useFactory: () => {
          return ComicSchema;
        },
      },
    ]),
  ],
  providers: [
    SiteAPI,
    ResourceAPI,
    ChapterAPI,
    ComicAPI,
    SiteService,
    ResourceService,
    ChapterService,
    ComicService,
    EnvironmentService,
  ],
  exports: [
    MongooseModule,
    SiteService,
    ResourceService,
    ChapterService,
    ComicService,
  ],
})
export class ComicMongoModule {}
