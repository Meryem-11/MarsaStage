import { Routes } from '@angular/router';

export const ACTIONS_ROUTES: Routes = [
  {
    path: 'listeActions',
    loadComponent: () =>
      import('./listeActions/listeActions')
        .then(m => m.ListeActions)
  },

  {
    path: '',
    redirectTo: 'listeActions',
    pathMatch: 'full'
  }
];