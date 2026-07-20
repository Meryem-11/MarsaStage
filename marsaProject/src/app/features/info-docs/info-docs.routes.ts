import { Routes } from '@angular/router';

export const INFO_DOCS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'liste-documents',
    pathMatch: 'full'
  },
  {
    path: 'liste-docs',
    loadComponent: () =>
      import('./liste-docs/liste-docs').then(m => m.ListeDocuments)
  }
];