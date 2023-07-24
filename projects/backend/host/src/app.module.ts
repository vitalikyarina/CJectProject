import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "./config";

@Module({
  imports: [ConfigurationModule, ComicModule],
})
export class AppModule {}
