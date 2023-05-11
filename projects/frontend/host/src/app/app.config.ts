import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
