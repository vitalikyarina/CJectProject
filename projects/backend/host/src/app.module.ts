import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "@cjp-back/configuration";
import { MongoModule } from "@cjp-back/mongo";

@Module({
  imports: [ConfigurationModule, MongoModule, ComicModule],
})
export class AppModule {}
