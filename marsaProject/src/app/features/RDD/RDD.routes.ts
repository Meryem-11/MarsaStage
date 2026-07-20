// revues-direction.routes.ts
import { Routes } from '@angular/router';

export const REVUES_DIRECTION_ROUTES: Routes = [
  { path: '', redirectTo: 'planification-rdd', pathMatch: 'full' },
  {
    path: 'planification',
    loadComponent: () => import('./planification/planification').then(m => m.PlanificationRdd)
  },
  {
    path: 'liste-action',
    loadComponent: () => import('./liste-action/liste-action').then(m => m.ListeActionsRdd)
  }
];