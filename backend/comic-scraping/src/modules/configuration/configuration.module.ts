import { Module } from "@nestjs/common";
import { EnvironmentService } from "./services";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";
import { getEnvValidationSchema } from "./utils";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...getEnvValidationSchema(),
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [ConfigModule, EnvironmentService],
})
export class ConfigurationModule {}
