import { NestFactory } from "@nestjs/core";
import { HostModule } from "./host.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    HostModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
