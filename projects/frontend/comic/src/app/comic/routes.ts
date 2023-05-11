import { Routes } from "@angular/router";
import { ComicLayoutComponent } from "./layout";
import { ComicsComponent, ComicCreateComponent } from "./pages";
import { ComicRoute } from "./core/enums";

export const ROUTES: Routes = [
  {
    component: ComicLayoutComponent,
    path: "",
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
