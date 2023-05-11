import { Injectable } from "@nestjs/common";
import { Browser, chromium, firefox } from "playwright";
import { defer, Observable } from "rxjs";

@Injectable()
export class BrowserHelperService {
  public getBrowser(type?: string): Observable<Browser> {
    return defer(() => this._getBrowser(type));
  }

  private async _getBrowser(type: string): Promise<Browser> {
    try {
      if (type !== "firefox") {
        const browser: Browser = await chromium.launch();
        return browser;
      }
      const browser: Browser = await firefox.launch();
      return browser;
    } catch {
      return this._getBrowser(type);
    }
  }
}
