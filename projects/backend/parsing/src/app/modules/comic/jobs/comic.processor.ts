import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { lastValueFrom } from "rxjs";
import { ComicProcessorHelperService } from "../services";
import { ComicQueues } from "../core";
import { ComicEntity } from "@cjp-back/mongo/comic";

@Processor(ComicQueues.COMIC)
export class ComicProcessor extends WorkerHost {
  constructor(private readonly helper: ComicProcessorHelperService) {
    super();
  }

  public process(job: Job<ComicEntity, void, string>): Promise<unknown> {
    const comic = job.data;
    return lastValueFrom(this.helper.startParsingComic(comic));
  }
}
