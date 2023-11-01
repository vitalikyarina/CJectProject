import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { getEnvValidationSchema } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...getEnvValidationSchema(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
