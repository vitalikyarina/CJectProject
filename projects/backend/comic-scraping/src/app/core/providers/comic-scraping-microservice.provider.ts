import { Provider } from "@nestjs/common";
import { COMIC_SCRAPING_MICROSERVICE } from "../tokens";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { CScrapingEnvironment } from "../enums";

export const COMIC_CRAPING_MICROSERVICE_PROVIDER: Provider = {
  provide: COMIC_SCRAPING_MICROSERVICE,
  useFactory: (config: ConfigService) => {
    const PORT: number = config.get<number>(CScrapingEnvironment.PORT);
    const HOST: string = config.get(CScrapingEnvironment.HOST);

    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: HOST,
      },
    });
  },
  inject: [ConfigService],
};
