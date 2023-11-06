import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { Environment } from "../core";
import { HostStaticPath } from "@cjp-back/shared";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const IMAGE_URL = config.get(Environment.IMAGE_FOLDER);

        return [
          {
            rootPath: IMAGE_URL,
            serveRoot: `/${HostStaticPath.IMAGES}`,
          },
        ];
      },
    }),
  ],
})
export class StaticFileModule {}
