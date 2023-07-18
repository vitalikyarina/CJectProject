import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

export class BaseClientProxy {
  constructor(private readonly clientProxy: ClientProxy) {}

  public send<T>(pattern: string, data: unknown): Observable<T> {
    return this.clientProxy.send(pattern, data);
  }
}
