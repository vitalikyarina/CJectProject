import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { comicValidationSchema } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env["MODE"] === "dev" ? ".env.dev" : ".env.prod",
      validationSchema: Joi.object({
        ...comicValidationSchema,
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
