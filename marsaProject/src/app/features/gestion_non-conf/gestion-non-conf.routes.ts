// non-conformites.routes.ts
import { Routes } from '@angular/router';

export const NON_CONFORMITES_ROUTES: Routes = [
  { path: '', redirectTo: 'liste-non-conformites', pathMatch: 'full' },
  {
    path: 'listes-non-conf',
    loadComponent: () => import('./listes-non-conf/listes-non-conf').then(m => m.ListeNonConformites)
  },
  {
    path: 'fiches-non-conf',
    loadComponent: () => import('./fiches-non-conf/fiches-non-conf').then(m => m.FicheNonConformite)
  }
];