import { NestFactory } from "@nestjs/core";
import { ParsingModule } from "./parsing.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ParsingModule);
  await app.listen(3000);
}
bootstrap();
