import { Injectable, Logger as BaseLogger } from "@nestjs/common";

@Injectable()
export class Logger extends BaseLogger {
  constructor() {
    super(Logger.name);
  }

  public log<T>(message: T): void {
    super.log(message);
  }

  public debug<T>(message: T): void {
    super.debug(message);
  }

  public error<T>(message: T): void {
    super.error(message);
  }
}
