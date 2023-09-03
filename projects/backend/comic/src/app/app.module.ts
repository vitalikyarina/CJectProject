import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicScrapingMicroservice } from "@cjp-back/comic-scraping/microservice";
import { ComicMongoModule } from "@cjp-back/comic";
import { EnvironmentModule, EnvironmentService } from "./modules/environment";

@Module({
  imports: [
    ConfigurationModule,
    ComicMongoModule.forRootAsync({
      useFactory: (env: EnvironmentService) => {
        return {
          uri: env.MONGO_URL,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
    }),
    ComicScrapingMicroservice.forRoot({ port: 3002, host: "0.0.0.0" }),
  ],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
