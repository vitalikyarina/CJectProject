import { EnvironmentProviders, Provider } from "@angular/core";
import { ApiComicService, ApiSiteService } from "../api";
import { ComicService, SiteService } from "../services";
import { ComicState, SiteState } from "../states";

export const ROUTE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  ApiComicService,
  ApiSiteService,
  ComicState,
  SiteState,
  SiteService,
  ComicService,
];
