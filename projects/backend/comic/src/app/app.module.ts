import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicMongoModule } from "./modules";
import { ComicScrapingMicroservice } from "@cjp-back/comic-scraping";

@Module({
  imports: [ConfigurationModule, ComicMongoModule, ComicScrapingMicroservice],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
