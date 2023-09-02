import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { EnvValidationSchema } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...EnvValidationSchema,
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
