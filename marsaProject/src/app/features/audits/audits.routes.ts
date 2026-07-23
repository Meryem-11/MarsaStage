import { Routes } from '@angular/router';

export const AUDITS_ROUTES: Routes = [
  { path: 'progAudit', loadComponent: () => import('./progAudit/progAudit').then(m => m.ProgAudit) },
  {path: 'progAudit/progDetail/:id',loadComponent: () =>import('./progAudit/progDetail/progDetail').then(m => m.ProgDetail)},
  { path: 'planAudit', loadComponent: () => import('./planAudit/planAudit').then(m => m.PlanAudit) },
  { path: 'resultAudit', loadComponent: () => import('./resultAudit/resultAudit').then(m => m.ResultAudit) },
  { path: 'listeAudit', loadComponent: () => import('./listeAudit/listeAudit').then(m => m.ListeAudit) },
  { path: '', redirectTo: 'progAudit', pathMatch: 'full' }
];