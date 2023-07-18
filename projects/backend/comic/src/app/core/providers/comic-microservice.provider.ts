import { Provider } from "@nestjs/common";
import { COMIC_MICROSERVICE } from "../tokens";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ComicEnvironment } from "../enums";

export const COMIC_MICROSERVICE_PROVIDER: Provider = {
  provide: COMIC_MICROSERVICE,
  useFactory: () => {
    const PORT: number = +process.env[ComicEnvironment.PORT];
    const HOST: string = process.env[ComicEnvironment.HOST];

    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: HOST,
      },
    });
  },
};
