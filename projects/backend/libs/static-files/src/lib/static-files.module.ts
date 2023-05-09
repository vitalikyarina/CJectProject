import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get("IMAGE_PATH"),
          serveRoot: "/assets",
          exclude: ["/api/(.*)"],
        },
      ],
    }),
  ],
  exports: [ServeStaticModule],
})
export class StaticFilesModule {}
