import { Route } from "@angular/router";
import { RemoteEntryComponent } from "./comic-layout.component";
import { ComicRoute } from "./core/enums";
import { ComicCreateComponent, ComicsComponent } from "./pages";

export const remoteRoutes: Route[] = [
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
    ],
  },
];
