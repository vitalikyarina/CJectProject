import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { remoteRoutes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(remoteRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
  ],
};
