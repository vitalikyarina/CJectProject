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
import { EnvironmentModule, EnvironmentService } from "./modules/environment";

@Module({
  imports: [
    ConfigurationModule,
    BullModule.registerQueue({
      name: ComicQueue.COMIC,
    }),
    ScheduleModule.forRoot(),
    ComicMongoModule.forRootAsync({
      useFactory: (env: EnvironmentService) => {
        return {
          uri: env.MONGO_URL,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
    }),
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
