import { NestFactory } from "@nestjs/core";
import { HostModule } from "./host.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(HostModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle("CJect example")
    .setDescription("The CJect API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
