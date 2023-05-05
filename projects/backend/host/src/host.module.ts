import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "@cjp/configuration";
import { MongoModule } from "@cjp/mongo";
import { StaticFilesModule } from "@cjp/static-files";

@Module({
  imports: [ConfigurationModule, MongoModule, ComicModule, StaticFilesModule],
  controllers: [],
  providers: [],
})
export class HostModule {}
