import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComicSchemaName } from "./enums";
import {
  ChapterSchema,
  ComicSchema,
  ResourceSchema,
  SiteSchema,
} from "./schemas";
import {
  ChapterAPIService,
  ComicAPIService,
  ResourceAPIService,
  SiteAPIService,
} from "./api";
import {
  ChapterService,
  ComicService,
  ResourceService,
  SiteService,
} from "./services";
import { SharedModule } from "@cjp-back/shared";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    MongooseModule.forFeature([
      {
        name: ComicSchemaName.COMICS_SITE,
        schema: SiteSchema,
      },
      {
        name: ComicSchemaName.COMICS_RESOURCE,
        schema: ResourceSchema,
      },
      {
        name: ComicSchemaName.COMICS_CHAPTER,
        schema: ChapterSchema,
      },
      {
        name: ComicSchemaName.COMIC,
        schema: ComicSchema,
      },
    ]),
  ],
  providers: [
    SiteAPIService,
    SiteService,
    ResourceAPIService,
    ResourceService,
    ChapterAPIService,
    ChapterService,
    ComicAPIService,
    ComicService,
  ],
  exports: [SiteService, ResourceService, ChapterService, ComicService],
})
export class SchemasComicModule {}
