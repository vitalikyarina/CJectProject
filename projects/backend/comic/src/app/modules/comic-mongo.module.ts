import { Module } from "@nestjs/common";
import {
  ChapterSchema,
  ChapterService,
  ComicEnvironment,
  ComicSchema,
  ComicSchemaName,
  ComicService,
  ResourceSchema,
  ResourceService,
  SiteSchema,
  SiteService,
} from "../core";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { SharedModule } from "@cjp-back/shared";
import { ChapterAPI, ComicAPI, ResourceAPI, SiteAPI } from "../core/apis";

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
          uri: configService.get(ComicEnvironment.MONGO_URL),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: ComicSchemaName.COMICS_SITE,
        useFactory: () => {
          return SiteSchema;
        },
      },
      {
        name: ComicSchemaName.COMICS_RESOURCE,
        useFactory: () => {
          return ResourceSchema;
        },
      },
      {
        name: ComicSchemaName.COMICS_CHAPTER,
        useFactory: () => {
          return ChapterSchema;
        },
      },
      {
        name: ComicSchemaName.COMIC,
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
