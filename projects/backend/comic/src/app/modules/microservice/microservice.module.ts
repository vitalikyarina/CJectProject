import { DynamicModule, Module, Provider } from "@nestjs/common";
import { COMIC_MICROSERVICE_PROVIDER } from "./providers";
import { ComicClientProxy, SiteClientProxy } from "./services";

@Module({
  imports: [],
})
export class ComicMicroservice {
  static forRoot(config: { port: number; host: string }): DynamicModule {
    const providers: Provider[] = [
      COMIC_MICROSERVICE_PROVIDER({ PORT: config.port, HOST: config.host }),
      ComicClientProxy,
      SiteClientProxy,
    ];
    return {
      module: ComicMicroservice,
      providers: providers,
      exports: providers,
    };
  }
}
