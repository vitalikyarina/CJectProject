import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./config";
import { BullModule } from "@nestjs/bullmq";
import {
  Logger,
  ComicProcessorChapterHelperService,
  ProcessorHelperService,
  ProcessorService,
  ProcessorResourceHelperService,
  ComicQueue,
  QueueService,
} from "./core";
import { ComicProcessor } from "./jobs";
import { ComicCron } from "./tasks";
import { ComicMongoModule } from "@cjp-back/comic";
import { BrowserModule } from "@cjp-back/browser";
import { SharedModule } from "@cjp-back/shared";
import { ScheduleModule } from "@nestjs/schedule";
import { ComicController } from "./controllers";

@Module({
  imports: [
    ConfigurationModule,
    BullModule.registerQueue({
      name: ComicQueue.COMIC,
    }),
    ScheduleModule.forRoot(),
    ComicMongoModule,
    BrowserModule,
    SharedModule,
  ],
  controllers: [ComicController],
  providers: [
    Logger,
    QueueService,
    ComicProcessor,
    ComicCron,
    ProcessorService,
    ProcessorResourceHelperService,
    ProcessorHelperService,
    ComicProcessorChapterHelperService,
  ],
})
export class AppModule {}
