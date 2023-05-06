import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComicSchema } from "./enums";
import { ComicSiteSchema } from "./schemas";
import { ComicSiteAPIService } from "./api";
import { ComicSiteService } from "./services";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ComicSchema.COMICS_SITE,
        schema: ComicSiteSchema,
      },
    ]),
  ],
  providers: [ComicSiteAPIService, ComicSiteService],
  exports: [ComicSiteService],
})
export class SchemasComicModule {}
