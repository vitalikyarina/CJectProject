/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { getEnv } from "./modules/configuration";
import { EnvironmentVars } from "./modules/configuration/enums";

async function bootstrap(): Promise<void> {
  const env = getEnv();

  const PORT: number = env[EnvironmentVars.PORT];
  const HOST: string = env[EnvironmentVars.HOST];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: HOST,
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Application of comic scraping is running`);
}

bootstrap();
