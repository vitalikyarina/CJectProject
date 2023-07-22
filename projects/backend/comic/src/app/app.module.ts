import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ConfigurationModule } from "./config";
import { ComicMongoModule } from "./modules";

@Module({
  imports: [ConfigurationModule, ComicMongoModule],
  controllers: [ComicController, SiteController],
  providers: [],
})
export class AppModule {}
