import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Indicateur {
  id: number;
  code: string;
  nomIndicateur: string;
  processus: string;
  formuleCalcul: string;
  sourceDonnees: string;
  frequence: 'Mensuelle' | 'Trimestrielle' | 'Semestrielle' | 'Annuelle';
  pilote: string;
  typeIndicateur: 'Qualité' | 'Performance' | 'Sécurité' | 'Environnement';
}

@Component({
  selector: 'app-gestion-indicateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-ind.html',
  styleUrl: './gestion-ind.css'
})
export class GestionIndicateurs {
  
  processusDisponibles: string[] = [
    'PR-MNG-01 : Management Stratégique & SMI',
    'PR-OPS-01 : Services aux Navires',
    'PR-OPS-02 : Manutention & Stockage des Marchandises',
    'PR-FIN-03 : Facturation'
  ];

  pilotesDisponibles: string[] = [
    'Meryem Hajar',
    'Ahmed Alami',
    'Sanaa Benslimane',
    'Karim Tazi'
  ];

  indicateursList: Indicateur[] = [
    {
      id: 1,
      code: 'IND-MNG-01',
      nomIndicateur: 'Taux de réalisation des objectifs globaux',
      processus: 'PR-MNG-01 : Management Stratégique & SMI',
      formuleCalcul: '(Objectifs réalisés / Objectifs prévus) x 100',
      sourceDonnees: 'Revues de direction',
      frequence: 'Semestrielle',
      pilote: 'Meryem Hajar',
      typeIndicateur: 'Performance'
    },
    {
      id: 2,
      code: 'IND-OPS-01',
      nomIndicateur: 'Temps d\'attente moyen en rade',
      processus: 'PR-OPS-01 : Services aux Navires',
      formuleCalcul: 'Somme des heures d\'attente / Nombre de navires',
      sourceDonnees: 'Système d\'exploitation portuaire',
      frequence: 'Mensuelle',
      pilote: 'Ahmed Alami',
      typeIndicateur: 'Qualité'
    },
    {
      id: 3,
      code: 'IND-OPS-02',
      nomIndicateur: 'Cadence de manutention',
      processus: 'PR-OPS-02 : Manutention & Stockage des Marchandises',
      formuleCalcul: 'Nombre de mouvements / Total heures de travail',
      sourceDonnees: 'Rapports de shift',
      frequence: 'Mensuelle',
      pilote: 'Karim Tazi',
      typeIndicateur: 'Performance'
    }
  ];

  addIndicateurLine() {
    const newId = this.indicateursList.length > 0 ? Math.max(...this.indicateursList.map(i => i.id)) + 1 : 1;
    const nextCode = `IND-NEW-${String(newId).padStart(2, '0')}`;
    
    this.indicateursList.push({
      id: newId,
      code: nextCode,
      nomIndicateur: '',
      processus: '',
      formuleCalcul: '',
      sourceDonnees: '',
      frequence: 'Mensuelle',
      pilote: '',
      typeIndicateur: 'Performance'
    });
  }

  removeIndicateur(id: number) {
    this.indicateursList = this.indicateursList.filter(ind => ind.id !== id);
  }
}