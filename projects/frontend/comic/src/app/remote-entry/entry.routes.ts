import { Route } from "@angular/router";

export const remoteRoutes: Route[] = [
  {
    path: "",
    loadChildren: () => import("../comic/routes").then((m) => m.ROUTES),
  },
];
