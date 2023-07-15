import { Injectable } from "@angular/core";
import { SiteEntity } from "@cjp-front/comic/core";

@Injectable()
export class ComicFormHelperService {
  public isRaw(link: string): boolean {
    const RAW = "-raw";

    return link.indexOf(RAW) > -1;
  }

  public getSiteByLink(
    sites: SiteEntity[],
    link: string,
  ): SiteEntity | undefined {
    const https = "https://";

    if (link.indexOf(https) === 0) {
      const siteBase = link.split("/")[2];
      const site = sites.find((site) => site.name == siteBase);
      return site;
    }

    return;
  }
}
