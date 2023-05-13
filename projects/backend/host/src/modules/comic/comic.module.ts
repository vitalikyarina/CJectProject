import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { SchemasComicModule } from "@cjp-back/mongo/comic";

@Module({
  imports: [SchemasComicModule],
  controllers: [SiteController, ComicController],
})
export class ComicModule {}
