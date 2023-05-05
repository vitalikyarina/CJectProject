import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const MODE = "dev";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: MODE === "dev" ? ".env.dev" : ".env.prod",
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        IMAGE_PATH: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
