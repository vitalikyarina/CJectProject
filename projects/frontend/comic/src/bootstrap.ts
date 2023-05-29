import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { RemoteEntryComponent } from "./app/comic-layout.component";
import { remoteRoutes } from "./app/app.routes";

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    provideRouter(remoteRoutes, withEnabledBlockingInitialNavigation()),
  ],
});
