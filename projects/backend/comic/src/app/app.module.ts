import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicScrapingMicroservice } from "@cjp-back/comic-scraping";
import { ComicMongoModule } from "@cjp-back/comic";

@Module({
  imports: [
    ConfigurationModule,
    ComicMongoModule.forRoot({
      url: "mongodb://127.0.0.1:27017/cject_comic_test",
    }),
    ComicScrapingMicroservice,
  ],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
