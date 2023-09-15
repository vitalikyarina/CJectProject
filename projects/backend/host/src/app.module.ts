import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "./config";
import { StaticFileModule } from "./static";
@Module({
  imports: [ConfigurationModule, StaticFileModule, ComicModule],
})
export class AppModule {}
