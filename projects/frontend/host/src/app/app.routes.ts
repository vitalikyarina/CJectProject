import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "comic",
    loadChildren: () => import("comic/Routes").then((m) => m.ROUTES),
  },
];
