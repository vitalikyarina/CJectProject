import { Routes } from '@angular/router';
import { ComicLayoutComponent } from './layout';
import { ComicComponent } from './pages';

export const ROUTES: Routes = [
  {
    component: ComicLayoutComponent,
    path: '',
    children: [
      {
        path: '',
        component: ComicComponent,
      },
    ],
  },
];
