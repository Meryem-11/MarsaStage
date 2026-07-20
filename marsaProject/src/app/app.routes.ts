import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
      
      // AJOUT DE VOTRE NOUVELLE ROUTE EN LAZY LOADING
      { path: 'processus/liste', loadComponent: () => import('./features/processus/processus-liste').then(m => m.ProcessusListe) },
      

      { path: 'audits', loadChildren: () => import('./features/audits/audits.routes').then(m => m.AUDITS_ROUTES) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'plan-action/analyse-des-risques', 
        loadComponent: () => import('./features/plan-action/analyse-des-risques/analyse-des-risques').then(m => m.AnalyseRisques) 
      },
       { 
        path: 'plan-action/action-risques', 
        loadComponent: () => import('./features/plan-action/action-risques/action-risques').then(m => m.ActionsRisques) 
      },
  
      {path: 'organisme', loadChildren: () => import('./features/organisme/organisme.routes').then(m => m.ORGANISME_ROUTES)},

      {path: 'actions', loadChildren: () => import('./features/actions/actions.routes').then(m => m.ACTIONS_ROUTES)},
      {path: 'environnement',loadChildren: () =>import('./features/environnement/environnement.routes').then(m => m.ENVIRONNEMENT_ROUTES)},
      {path: 'reclamations',loadChildren: () => import('./features/reclamations/reclamations.routes').then(m => m.RECLAMATIONS_ROUTES)},

      {path: 'actions', loadChildren: () => import('./features/actions/actions.routes').then(m => m.ACTIONS_ROUTES)

      },
       {path: 'performances/tab-bord', loadComponent: () => import('./features/performances/tab-bord/tab-bord').then(m => m.TableauxBord)
      },
      {path: 'performances/gestion-ind', loadComponent: () => import('./features/performances/gestion-ind/gestion-ind').then(m => m.GestionIndicateurs)
      },
      {path: 'sante-securite/analyse-sst', loadComponent: () => import('./features/sante-securite/analyse-sst/analyse-sst').then(m => m.AnalyseSst)

      },
      {path: 'sante-securite/prog-sst', loadComponent: () => import('./features/sante-securite/prog-sst/prog-sst').then(m => m.ProgrammeSst)

      },
      {
      path: 'conformite',loadChildren: () =>import('./features/conformite/conformite.routes').then(m => m.CONFORMITE_ROUTES)
      },
    
     {
      path: 'RDD',
       loadChildren: () => import('./features/RDD/RDD.routes').then(m => m.REVUES_DIRECTION_ROUTES)
     },
         
     {
      path: 'info-docs',
       loadChildren: () => import('./features/info-docs/info-docs.routes').then(m => m.INFO_DOCS_ROUTES)
     },
     // dans app.routes.ts
{
  path: 'gestion_non-conf',
  loadChildren: () => import('./features/gestion_non-conf/gestion-non-conf.routes').then(m => m.NON_CONFORMITES_ROUTES)

}
    ]
  }
];
