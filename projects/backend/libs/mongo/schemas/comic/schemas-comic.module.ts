import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComicSchema } from "./enums";
import { ChapterSchema, ResourceSchema, SiteSchema } from "./schemas";
import { ChapterAPIService, ResourceAPIService, SiteAPIService } from "./api";
import { ChapterService, ResourceService, SiteService } from "./services";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ComicSchema.COMICS_SITE,
        schema: SiteSchema,
      },
      {
        name: ComicSchema.COMICS_RESOURCE,
        schema: ResourceSchema,
      },
      {
        name: ComicSchema.COMICS_CHAPTER,
        schema: ChapterSchema,
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
  ],
  exports: [SiteService, ResourceService, ChapterService],
})
export class SchemasComicModule {}
