import { Routes } from "@angular/router";
import { ComicLayoutComponent } from "./layout";
import { ComicsComponent } from "./pages";
import { ComicRoute } from "./core";

export const ROUTES: Routes = [
  {
    component: ComicLayoutComponent,
    path: "",
    children: [
      {
        path: ComicRoute.DEFAULT,
        component: ComicsComponent,
      },
    ],
  },
];
