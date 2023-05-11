import { Module } from "@nestjs/common";
import { ComicModule } from "./modules";
import { ConfigurationModule } from "@cjp-back/configuration";
import { MongoModule } from "@cjp-back/mongo";
import { StaticFilesModule } from "@cjp-back/static-files";
import { AngularUniversalModule } from "@nestjs/ng-universal";
import { join } from "path";
import { AppComponent } from "@cjp-front/app";

@Module({
  imports: [
    ConfigurationModule,
    MongoModule,
    ComicModule,
    StaticFilesModule,
    AngularUniversalModule.forRoot({
      bootstrap: AppComponent,
      viewsPath: join(process.cwd(), "dist/{APP_NAME}/browser"),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
