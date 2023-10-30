import { DynamicModule, Module } from "@nestjs/common";
import { COMIC_CRAPING_MICROSERVICE_PROVIDER } from "./providers";
import { ClientProxy } from "./services";

@Module({})
export class ComicScrapingMicroservice {
  static forRoot(config: { port: number; host: string }): DynamicModule {
    return {
      module: ComicScrapingMicroservice,
      providers: [
        COMIC_CRAPING_MICROSERVICE_PROVIDER({
          PORT: config.port,
          HOST: config.host,
        }),
        ClientProxy,
      ],
      exports: [ClientProxy],
    };
  }
}
