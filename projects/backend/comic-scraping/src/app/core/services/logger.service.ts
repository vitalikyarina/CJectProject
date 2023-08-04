import { Injectable, Logger as nLogger } from "@nestjs/common";

@Injectable()
export class Logger {
  private readonly logger = new nLogger(Logger.name);

  public log<T>(message: T): void {
    this.logger.log(message);
  }

  public debug<T>(message: T): void {
    this.logger.debug(message);
  }

  public error<T>(message: T): void {
    this.logger.error(message);
  }
}
