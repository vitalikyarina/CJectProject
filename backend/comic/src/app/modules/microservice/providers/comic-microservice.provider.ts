import { Provider } from "@nestjs/common";
import { COMIC_MICROSERVICE } from "../tokens";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export function COMIC_MICROSERVICE_PROVIDER({
  PORT,
  HOST,
}: {
  PORT: number;
  HOST: string;
}): Provider {
  return {
    provide: COMIC_MICROSERVICE,
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
}
