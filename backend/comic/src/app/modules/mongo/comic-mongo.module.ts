import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleAsyncOptions } from "@nestjs/mongoose";
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
  ResourceService,
  SiteService,
} from "./services";
import { EnvironmentModule } from "../environment";

@Module({})
export class ComicMongoModule {
  static forRoot(url: string): DynamicModule {
    return {
      module: ComicMongoModule,
      imports: [
        EnvironmentModule,
        SharedModule,
        MongooseModule.forRootAsync({
          useFactory: () => {
            mongoose.plugin(mongooseAutoPopulate);
            return {
              uri: url,
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
      ],
      exports: [
        MongooseModule,
        SiteService,
        ResourceService,
        ChapterService,
        ComicService,
      ],
    };
  }

  static forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule {
    return {
      module: ComicMongoModule,
      imports: [
        EnvironmentModule,
        SharedModule,
        MongooseModule.forRootAsync(options),
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
      ],
      exports: [
        MongooseModule,
        SiteService,
        ResourceService,
        ChapterService,
        ComicService,
      ],
    };
  }
}
