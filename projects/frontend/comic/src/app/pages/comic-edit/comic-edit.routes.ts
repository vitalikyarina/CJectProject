import { Routes } from "@angular/router";
import { ComicEditParameter } from "./enums";
import { ComicEditComponent } from "./comic-edit.component";

export const ComicEditRoutes: Routes = [
  {
    path: `:${ComicEditParameter.COMIC_ID}`,
    component: ComicEditComponent,
  },
];
