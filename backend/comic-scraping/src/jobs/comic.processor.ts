import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { ProcessorService, ComicQueue } from "../core";

@Processor(ComicQueue.COMIC)
export class ComicProcessor extends WorkerHost {
  constructor(private readonly helper: ProcessorService) {
    super();
  }

  public async process(job: Job<string, void, string>): Promise<void> {
    const comic = job.data;
    await this.helper.startComicScraping(comic);
  }
}
