import {
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from "@angular/core";
import { ApiComicService, ApiComicSiteService } from "../api";
import { ComicService, SiteService } from "../../services";
import { ComicState } from "../states";
import { NgxsModule } from "@ngxs/store";

export const ROUTE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  importProvidersFrom(NgxsModule.forFeature([ComicState])),
  ApiComicService,
  ApiComicSiteService,
  SiteService,
  ComicService,
  ComicState,
];
