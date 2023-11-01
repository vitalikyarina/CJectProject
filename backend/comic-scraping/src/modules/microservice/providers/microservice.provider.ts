import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { COMIC_SCRAPING_MICROSERVICE } from "../tokens";

export const COMIC_CRAPING_MICROSERVICE_PROVIDER = ({
  PORT,
  HOST,
}: {
  PORT: number;
  HOST: string;
}): Provider => {
  return {
    provide: COMIC_SCRAPING_MICROSERVICE,
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          port: PORT,
          host: HOST,
        },
      });
    },
  };
};
