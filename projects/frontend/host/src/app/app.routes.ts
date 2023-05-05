import { Routes } from "@angular/router";
import { AppRoute } from "./enums";

export const routes: Routes = [
  {
    path: AppRoute.COMICS,
    loadChildren: () => import("comic/Routes").then((m) => m.ROUTES),
  },
  {
    path: "**",
    redirectTo: AppRoute.DEFAULT,
  },
];