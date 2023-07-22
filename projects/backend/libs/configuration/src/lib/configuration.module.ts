import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env["MODE"] === "dev" ? ".env.dev" : ".env.prod",
      validationSchema: Joi.object({
        IMAGE_PATH: Joi.string().required(),
      }).unknown(),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
