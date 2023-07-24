/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";
import { getEnv } from "./config";
import { HostEnvironment } from "./core";

async function bootstrap(): Promise<void> {
  const env = getEnv();
  const PORT = env[HostEnvironment.PORT];
  const IMAGE_URL = env[HostEnvironment.IMAGE_URL];

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  app.useStaticAssets({
    root: IMAGE_URL,
    prefix: "/assets",
  });

  setupSwagger(app);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`,
  );
}

bootstrap();
