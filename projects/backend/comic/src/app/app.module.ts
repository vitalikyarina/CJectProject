import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicScrapingMicroservice } from "@cjp-back/comic-scraping/microservice";
import { ComicMongoModule } from "@cjp-back/comic";

@Module({
  imports: [
    ConfigurationModule,
    ComicMongoModule.forRoot({
      url: "mongodb://127.0.0.1:27017/cject_comic",
    }),
    ComicScrapingMicroservice.forRoot({ port: 3002, host: "0.0.0.0" }),
  ],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
