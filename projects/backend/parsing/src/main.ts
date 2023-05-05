import { NestFactory } from "@nestjs/core";
import { ParsingModule } from "./parsing.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    ParsingModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
