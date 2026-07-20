import { Routes } from '@angular/router';

export const ENVIRONNEMENT_ROUTES: Routes = [
  {
    path: 'analyse',
    loadComponent: () =>
      import('./analyse/analyse')
        .then(m => m.Analyse)
  },
   {
    path: 'programme',
    loadComponent: () =>
      import('./programme/programme')
        .then(m => m.Programme)
  },

  {
    path: '',
    redirectTo: 'analyse',
    pathMatch: 'full'
  }
];