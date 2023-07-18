import { Module } from "@nestjs/common";
import { COMIC_MICROSERVICE_PROVIDER, ComicClientProxy } from "../core";

@Module({
  providers: [COMIC_MICROSERVICE_PROVIDER, ComicClientProxy],
  exports: [ComicClientProxy],
})
export class ComicMicroservice {}
