import { Module } from "@nestjs/common";
import {
  COMIC_MICROSERVICE_PROVIDER,
  ComicClientProxy,
  SiteClientProxy,
} from "../core";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [COMIC_MICROSERVICE_PROVIDER, ComicClientProxy, SiteClientProxy],
  exports: [ComicClientProxy, SiteClientProxy],
})
export class ComicMicroservice {}
