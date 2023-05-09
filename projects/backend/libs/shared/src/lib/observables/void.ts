import { Observable } from "rxjs";

export const VOID = new Observable<void>((subscriber) => {
  subscriber.next();
  subscriber.complete();
});
