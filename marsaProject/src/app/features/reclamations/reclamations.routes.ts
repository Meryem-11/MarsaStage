import { Routes } from '@angular/router';

export const RECLAMATIONS_ROUTES: Routes = [
  { path: 'tableau', loadComponent: () => import('./tableau/tableau').then(m => m.Tableau) },
  { path: '', redirectTo: 'tableau', pathMatch: 'full' }
];