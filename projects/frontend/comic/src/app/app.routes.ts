import { Routes } from "@angular/router";
import { RemoteEntryComponent } from "./comic-layout.component";
import { ComicRoute } from "./core/enums";
import { ComicCreateComponent, ComicsComponent } from "./pages";
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
        component: ComicCreateComponent,
      },
      {
        path: ComicRoute.EDIT,
        loadChildren: () => import("./pages").then((r) => r.ComicEditRoutes),
      },
    ],
    providers: ROUTE_PROVIDERS,
  },
];
