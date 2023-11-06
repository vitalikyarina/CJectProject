import { VOID } from "@cjp-back/shared";
import { Browser } from "playwright";
import {
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  from,
  switchMap,
} from "rxjs";

export function closeBrowser(
  browser: Browser,
): OperatorFunction<unknown, void> {
  return (source$) =>
    source$.pipe(
      switchMap(() => {
        return from(browser.close());
      }),
      switchMap(() => VOID),
    );
}

export function final<T>(): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) => {
      source.subscribe(subscriber);
      subscriber.add(() => {
        console.log("final");
      });
    });
}
