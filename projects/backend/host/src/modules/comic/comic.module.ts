import { Module } from "@nestjs/common";
import { ComicController, SiteController } from "./controllers";
import { ComicMicroservice } from "@cjp-back/comic/microservice";

@Module({
  imports: [ComicMicroservice.forRoot({ host: "0.0.0.0", port: 3001 })],
  controllers: [SiteController, ComicController],
  providers: [],
})
export class ComicModule {}
