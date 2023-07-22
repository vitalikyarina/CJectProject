import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ComicMicroservice } from "@cjp-back/comic";

@Module({
  imports: [ComicMicroservice],
  controllers: [SiteController, ComicController],
  providers: [],
})
export class ComicModule {}
