import { Injectable, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { IFindOptions } from "@cjp-back/shared";
import { ComicService } from "@cjp-back/comic";
import { QueueService } from "../core";

@Injectable()
export class ComicCron implements OnModuleInit {
  private readonly options: IFindOptions = {
    sort: {
      name: "asc",
    },
  };

  constructor(
    private readonly comicService: ComicService,
    private readonly queue: QueueService,
  ) {}

  public async onModuleInit(): Promise<void> {
    await this.queue.cleanQueue();
    // await this.checkComics();
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  public async checkComics(): Promise<void> {
    const comics = await this.comicService.find({}, this.options);
    await this.queue.startComicsScraping(comics);
  }
}
