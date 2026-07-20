import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  icon: string; // Ajout de l'icône spécifique
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  kpis: KpiCard[] = [
    { label: 'Documents actifs', value: '128', trend: '+4 ce mois', trendPositive: true, icon: 'description' },
    { label: 'Audits planifiés', value: '6', trend: '2 en retard', trendPositive: false, icon: 'assignment_turned_in' },
    { label: 'Non-conformités ouvertes', value: '11', trend: '-3 vs. mois dernier', trendPositive: true, icon: 'warning' },
    { label: 'Actions correctives', value: '19', trend: '5 en attente', trendPositive: false, icon: 'playlist_add_check' },
    { label: 'Incidents/accidents declarés', value: '2', trend: '-3 vs. mois dernier', trendPositive: false, icon: 'health_and_safety' },
    { label: 'Equipements à inspecter', value: '9', trend: '3 en attente', trendPositive: false, icon: 'fact_check' },
  ];
}