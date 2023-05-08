import { Route } from "@angular/router";
import { RemoteEntryComponent } from "./entry.component";

export const appRoutes: Route[] = [
  {
    path: "",
    component: RemoteEntryComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./remote-entry/entry.routes").then((m) => m.remoteRoutes),
      },
    ],
  },
];
