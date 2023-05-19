import {
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from "@angular/core";
import { ApiComicService, ApiComicSiteService } from "../api";
import { ComicService, ComicSiteService } from "../../services";
import { ComicState } from "../states";
import { NgxsModule } from "@ngxs/store";

export const ROUTE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  importProvidersFrom(NgxsModule.forFeature([ComicState])),
  ApiComicService,
  ApiComicSiteService,
  ComicSiteService,
  ComicService,
  ComicState,
];
