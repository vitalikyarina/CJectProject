import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "@cjp-back/configuration";
import { MongoModule } from "@cjp-back/mongo";
import { StaticFilesModule } from "@cjp-back/static-files";

@Module({
  imports: [ConfigurationModule, MongoModule, ComicModule, StaticFilesModule],
})
export class AppModule {}
