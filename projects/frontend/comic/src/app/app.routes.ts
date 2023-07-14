import { Routes } from "@angular/router";
import { RemoteEntryComponent } from "./layouts";
import { ComicRoute } from "./core/enums";
import { ComicsComponent } from "./pages";
import { ROUTE_PROVIDERS } from "./core";

export const remoteRoutes: Routes = [
  {
    path: "",
    component: RemoteEntryComponent,
    children: [
      {
        path: ComicRoute.DEFAULT,
        component: ComicsComponent,
      },
      {
        path: ComicRoute.CREATE,
        loadChildren: () => import("./pages").then((r) => r.ComicCreateRoutes),
      },
      {
        path: ComicRoute.EDIT,
        loadChildren: () => import("./pages").then((r) => r.ComicEditRoutes),
      },
    ],
    providers: ROUTE_PROVIDERS,
  },
];
