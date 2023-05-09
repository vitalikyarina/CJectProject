import { Module } from "@nestjs/common";
import { ComicController, ComicSiteController } from "./controllers";
import { SchemasComicModule } from "@cjp-back/mongo/comic";

@Module({
  imports: [SchemasComicModule],
  controllers: [ComicSiteController, ComicController],
  providers: [],
})
export class ComicModule {}
