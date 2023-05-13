import { VOID } from "@cjp-back/shared";
import { Download, ElementHandle, Page } from "playwright";
import {
  OperatorFunction,
  defer,
  forkJoin,
  from,
  map,
  switchMap,
  take,
} from "rxjs";
import * as fs from "fs";

export function downloadImage(
  page: Page,
  element: string | ElementHandle<SVGElement | HTMLElement>,
  dir: string,
  checkExists = false,
): OperatorFunction<unknown, void> {
  console.log("image download");

  let element$;
  if (typeof element === "string") {
    element$ = page.$eval(element, (elem: HTMLImageElement) => {
      if (elem) {
        const link = elem.src;
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.download = "image.jpg";
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
      }
      return;
    });
  } else {
    element$ = element.evaluate((elem: HTMLImageElement) => {
      const link = elem.src;
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.download = "image.jpg";
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    });
  }

  const fork = [page.waitForEvent("download"), element$];

  return (source$) => {
    if (checkExists && fs.existsSync(dir)) {
      return VOID;
    }
    console.log(fs.existsSync(dir));

    return source$.pipe(
      switchMap(() => {
        return forkJoin(fork);
      }),
      map((data): Download | undefined => {
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          if (typeof elem !== "undefined") {
            return elem;
          }
        }
        return undefined;
      }),
      switchMap((download) => {
        if (download) return download.saveAs(dir);

        return VOID;
      }),
    );
  };
}
