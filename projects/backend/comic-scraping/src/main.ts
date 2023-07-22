/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";

import { AppModule } from "./app/app.module";
import { getComicScrapingEnv } from "./app/config";
import { ComicScrapingEnvironment } from "./app";

async function bootstrap(): Promise<void> {
  const env = getComicScrapingEnv();

  const PORT: number = env[ComicScrapingEnvironment.PORT];
  const HOST: string = env[ComicScrapingEnvironment.HOST];

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
