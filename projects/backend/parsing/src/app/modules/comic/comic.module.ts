import { Module } from "@nestjs/common";
import { SchemasComicModule } from "@cjp-back/mongo/comic";
import { BullModule } from "@nestjs/bullmq";
import { ScheduleModule } from "@nestjs/schedule";
import { ComicQueues } from "./core";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@cjp-back/shared";
import { BrowserModule } from "@cjp-back/browser";
import {
  ComicLoggerService,
  ComicProcessorHelperService,
  ComicQueuesService,
} from "./services";
import { ComicCronService } from "./tasks";
import {
  ComicProcessorChapterHelperService,
  ComicProcessorComicHelperService,
  ComicProcessorResourceHelperService,
} from "./services/comic-processor";
import { ComicProcessor } from "./jobs";

@Module({
  imports: [
    SchemasComicModule,
    BullModule.registerQueue({
      name: ComicQueues.COMIC,
    }),
    ScheduleModule.forRoot(),
    ConfigModule,
    SharedModule,
    BrowserModule,
  ],
  providers: [
    ComicLoggerService,
    ComicQueuesService,
    ComicCronService,
    ComicProcessorComicHelperService,
    ComicProcessorChapterHelperService,
    ComicProcessorResourceHelperService,
    ComicProcessorHelperService,
    ComicProcessor,
  ],
})
export class ComicModule {}
