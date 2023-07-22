import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "@cjp-back/configuration";

@Module({
  imports: [ConfigurationModule, ComicModule],
})
export class AppModule {}
