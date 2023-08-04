import { Injectable } from "@nestjs/common";
import { Browser, Page, firefox } from "playwright";
import { defer, Observable } from "rxjs";

@Injectable()
export class BrowserHelperService {
  public getBrowser$(): Observable<Browser> {
    return defer(() => this.getBrowser());
  }

  public async getBrowser(): Promise<Browser> {
    try {
      const browser: Browser = await firefox.launch({
        args: ["--disable-web-security", "--mute-audio"],
      });
      return browser;
    } catch {
      return this.getBrowser();
    }
  }

  public async downloadImgFromPage(
    page: Page,
    elementPath: string,
    filePath: string,
  ): Promise<void> {
    const a = page.$eval(elementPath, (elem: HTMLImageElement) => {
      const link = elem.src;
      fetch(link)
        .then((res) => res.blob())
        .then((blob) => {
          const a = document.createElement("a");

          a.href = URL.createObjectURL(blob);
          a.download = "image.jpg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    });
    const [download] = await Promise.all([
      page.waitForEvent("download"), // wait for download to start
      a,
    ]);
    await download.saveAs(filePath);
  }
}
