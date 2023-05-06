import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComicSchema } from "./enums";
import { ComicResourceSchema, ComicSiteSchema } from "./schemas";
import { ComicResourceAPIService, ComicSiteAPIService } from "./api";
import { ComicResourceService, ComicSiteService } from "./services";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ComicSchema.COMICS_SITE,
        schema: ComicSiteSchema,
      },
      {
        name: ComicSchema.COMICS_RESOURCE,
        schema: ComicResourceSchema,
      },
    ]),
  ],
  providers: [
    ComicSiteAPIService,
    ComicSiteService,
    ComicResourceAPIService,
    ComicResourceService,
  ],
  exports: [ComicSiteService, ComicResourceService],
})
export class SchemasComicModule {}
