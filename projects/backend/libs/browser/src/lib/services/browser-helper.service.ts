import { Injectable } from "@nestjs/common";
import { Browser, chromium, firefox } from "playwright";
import { defer, Observable } from "rxjs";

@Injectable()
export class BrowserHelperService {
  public getBrowser$(type?: string): Observable<Browser> {
    return defer(() => this.getBrowser(type));
  }

  public async getBrowser(type: string): Promise<Browser> {
    try {
      if (type !== "firefox") {
        const browser: Browser = await chromium.launch({
          args: ["--disable-web-security"],
          headless: false,
        });
        return browser;
      }
      const browser: Browser = await firefox.launch({
        args: ["--disable-web-security"],
      });
      return browser;
    } catch {
      return this.getBrowser(type);
    }
  }
}
