import { Routes } from '@angular/router';

export const CONFORMITE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'liste-exigences',
    pathMatch: 'full'
  },
  {
    path: 'liste-exige',
    loadComponent: () =>
      import('./liste-exige/liste-exige').then(m => m.ListeExigences)
  },
  {
    path: 'mise-conf',
    loadComponent: () =>
      import('./mise-conf/mise-conf').then(m => m.MiseEnConformite)
  }
];