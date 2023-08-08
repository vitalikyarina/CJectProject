import { Module } from "@nestjs/common";
import {
  COMIC_CRAPING_MICROSERVICE_PROVIDER,
  ComicScrapingClientProxy,
} from "../core";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [COMIC_CRAPING_MICROSERVICE_PROVIDER, ComicScrapingClientProxy],
  exports: [ComicScrapingClientProxy],
})
export class ComicScrapingMicroservice {}
