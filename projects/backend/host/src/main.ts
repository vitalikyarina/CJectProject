/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";
import { getEnv } from "./config";
import { Environment } from "./core";

async function bootstrap(): Promise<void> {
  const env = getEnv();
  const PORT = env[Environment.PORT];

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({}));

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  setupSwagger(app);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`,
  );
}

bootstrap();
