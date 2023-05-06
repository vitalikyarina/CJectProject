import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const MODE = "prod";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${MODE}`,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        IMAGE_PATH: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
