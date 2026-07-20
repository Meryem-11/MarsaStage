import { Routes } from '@angular/router';

export const ORGANISME_ROUTES: Routes = [
  { path: 'swot', loadComponent: () => import('./swot/swot').then(m => m.Swot) },
  { path: 'pestel', loadComponent: () => import('./pestel/pestel').then(m => m.Pestel) },
  { path: '', redirectTo: 'swot', pathMatch: 'full' },
  { path: 'pp', loadComponent: () => import('./pp/pp').then(m => m.Pp) }
];