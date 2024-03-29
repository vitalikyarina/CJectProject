import { Injectable, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { take, tap, toArray } from "rxjs";
import { ComicQueuesService } from "../services";
import { ComicService } from "@cjp-back/mongo/comic";

@Injectable()
export class ComicCronService implements OnModuleInit {
  constructor(
    private readonly comicService: ComicService,
    private readonly comicQueues: ComicQueuesService,
  ) {}

  public onModuleInit(): void {
    this.comicQueues.cleanQueue().subscribe(() => {
      this.checkComics();
    });
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  public checkComics(): void {
    this.comicService
      .find(
        {},
        {
          sort: {
            name: "asc",
          },
        },
      )
      .pipe(
        toArray(),
        take(1),
        tap((comics) => {
          this.comicQueues.parseComics(comics);
        }),
      )
      .subscribe();
  }
}
