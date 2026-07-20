import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavSubItem {
  label: string;
  route: string;
}

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavSubItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() collapsed = false;

  openModule: string | null = null;

  toggleModule(label: string) {
    this.openModule = this.openModule === label ? null : label;
  }

  navItems: NavItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'home',
      route: '/dashboard'
    },
    {
      label: 'Cartographie des Processus',
      icon: 'account_tree',
      children: [
        { label: 'Listes des processus', route: '/processus/liste' }
      ]
    },
    {
      label: "Contexte de l'organisme",
      icon: 'corporate_fare',
      children: [
        { label: 'Analyse SWOT', route: '/organisme/swot' },
        { label: 'Analyse PESTEL', route: '/organisme/pestel' },
        { label: 'Analyse Parties Intéressées', route: '/organisme/pp' }
      ]
    },
    {
      label: 'Risques et Opportunités',
      icon: 'security',
      children: [
        { label: 'Analyse des risques', route: '/plan-action/analyse-des-risques' },
        { label: 'Actions face aux risques', route: '/plan-action/action-risques' }
      ]
    },
    {
      label: "Plans d'Actions",
      icon: 'playlist_add_check',
      children: [
        { label: "Plan d'action général", route: '/actions/listeActions' }
      ]
    },
    {
      label: 'Performances (Obj. & Ind.)',
      icon: 'bar_chart',
      children: [
        { label: 'Tableaux de bord', route: '/performances/tab-bord' },
        { label: 'Gestion des indicateurs', route: '/performances/gestion-ind' }
      ]
    },
    {
      label: 'Environnement',
      icon: 'eco',
      children: [
        { label: 'Analyse environnementale', route: '/environnement/analyse' },
        { label: 'Programme environnemental', route: '/environnement/programme' }
      ]
    },
    {
      label: 'Santé & Sécurité au Travail',
      icon: 'health_and_safety',
      children: [
        { label: 'Analyse SST', route: '/sante-securite/analyse-sst' },
        { label: 'Programme SST', route: '/sante-securite/prog-sst' }
      ]
    },
    {
      label: 'Obligations de Conformité',
      icon: 'fact_check',
      children: [
        { label: 'Liste des exigences', route: '/conformite/liste-exige' },
        { label: 'Mise en confirmité', route: '/conformite/mise-conf' }
      ]
    },
    {
      label: 'Audits',
      icon: 'assignment_turned_in',
      children: [
        { label: 'Programme annuel audit', route: '/audits/progAudit' },
        { label: 'Plan audit', route: '/audits/planAudit' },
        { label: 'Résultats des audits', route: '/audits/resultAudit' },
        { label: 'Liste des actions', route: '/audits/listeAudit' }
      ]
    },
    {
      label: 'Revues de Direction',
      icon: 'rate_review',
      children: [
        { label: 'Planification RDD', route: '/RDD/planification' },
        { label: 'Liste des actions RDD', route: '/RDD/liste-action' }
      ]
    },
    {
      label: 'Informations Documentées',
      icon: 'description',
      children: [
        { label: 'Liste des documents', route: '/info-docs/liste-docs' }
      ]
    },
    {
      label: 'Gestion des Non-Conformités',
      icon: 'warning',
      children: [
        { label: 'Fiches de non-conformités', route: '/gestion_non-conf/fiches-non-conf' },
        { label: 'Liste des non-conformités', route: '/gestion_non-conf/listes-non-conf' }
      ]
    },
    {
      label: 'Gestion des Réclamations',
      icon: 'forum',
      children: [
        { label: 'Tableau des réclamations', route: '/reclamations/tableau' }
      ]
    }
  ];
}