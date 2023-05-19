import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { RemoteEntryComponent } from "./app/comic-layout.component";
import { remoteRoutes } from "./app/app.routes";

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(remoteRoutes, {
        initialNavigation: "enabledBlocking",
      }),
    ),
  ],
});
