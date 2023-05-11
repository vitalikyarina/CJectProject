import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env["MODE"]}`,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        IMAGE_PATH: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
