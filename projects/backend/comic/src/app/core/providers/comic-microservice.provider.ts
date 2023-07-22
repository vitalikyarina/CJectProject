import { Provider } from "@nestjs/common";
import { COMIC_MICROSERVICE } from "../tokens";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ComicEnvironment } from "../enums";
import { ConfigService } from "@nestjs/config";

export const COMIC_MICROSERVICE_PROVIDER: Provider = {
  provide: COMIC_MICROSERVICE,
  useFactory: (config: ConfigService) => {
    const PORT: number = config.get<number>(ComicEnvironment.PORT);
    const HOST: string = config.get(ComicEnvironment.HOST);

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
