import { Module } from "@nestjs/common";
import { ComicSiteController } from "./controllers";
import { SchemasComicModule } from "@cjp-back/mongo/comic";

@Module({
  imports: [SchemasComicModule],
  controllers: [ComicSiteController],
  providers: [],
})
export class ComicModule {}
