import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ComicLoggerService {
  private readonly logger = new Logger(ComicLoggerService.name);

  public log<T>(message: T): void {
    this.logger.log(message);
  }

  public debug<T>(message: T): void {
    this.logger.debug(message);
  }
}
