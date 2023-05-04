import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./comic/routes').then((m) => m.ROUTES),
  },
];
