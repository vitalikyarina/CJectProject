import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@cjp-back/configuration";
import { MongoModule } from "@cjp-back/mongo";
import { ComicModule } from "./modules";

@Module({
  imports: [ConfigurationModule, MongoModule, ComicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
