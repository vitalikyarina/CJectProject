import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicScrapingMicroservice } from "@cjp-back/comic-scraping";
import { ComicMongoModule } from "@cjp-back/comic";

@Module({
  imports: [ConfigurationModule, ComicMongoModule, ComicScrapingMicroservice],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
