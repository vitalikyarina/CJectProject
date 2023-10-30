import { Injectable, Logger as BaseLogger } from "@nestjs/common";

@Injectable()
export class Logger extends BaseLogger {
  constructor() {
    super(Logger.name);
  }

  public override log<T>(message: T): void {
    super.log(message);
  }

  public override debug<T>(message: T): void {
    super.debug(message);
  }

  public override error<T>(message: T): void {
    super.error(message);
  }
}
