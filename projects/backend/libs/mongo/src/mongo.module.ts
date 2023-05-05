import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        mongoose.plugin(mongooseAutoPopulate);
        return {
          uri: configService.get("MONGO_URL"),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
