import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TableauBord {
  id: number;
  code: string;
  nomProcessus: string;
  indicateurCle: string;
  cible: string;
  valeurActuelle: number;
  unite: string;
  frequence: 'Mensuel' | 'Trimestriel' | 'Semestriel' | 'Annuel';
  statut: 'Conforme' | 'Alerte' | 'Non atteint';
}

@Component({
  selector: 'app-tableaux-bord',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-bord.html',
  styleUrl: './tab-bord.css'
})
export class TableauxBord {
  
  // Données statistiques pour les KPI Cards du haut
  totalIndicateurs = 14;
  indicateursConformes = 10;
  indicateursAlerte = 3;
  indicateursNonAtteints = 1;

  // Liste des tableaux de bord par processus
  tableauxList: TableauBord[] = [
    {
      id: 1,
      code: 'TB-MNG-01',
      nomProcessus: 'Management Stratégique & SMI',
      indicateurCle: 'Taux de réalisation des objectifs globaux',
      cible: '>= 90',
      valeurActuelle: 92,
      unite: '%',
      frequence: 'Semestriel',
      statut: 'Conforme'
    },
    {
      id: 2,
      code: 'TB-OPS-01',
      nomProcessus: 'Services aux Navires',
      indicateurCle: 'Temps d\'attente moyen en rade',
      cible: '< 4',
      valeurActuelle: 4.5,
      unite: 'heures',
      frequence: 'Mensuel',
      statut: 'Alerte'
    },
    {
      id: 3,
      code: 'TB-OPS-02',
      nomProcessus: 'Manutention & Stockage',
      indicateurCle: 'Cadence de chargement/déchargement',
      cible: '>= 25',
      valeurActuelle: 28,
      unite: 'mvt/h',
      frequence: 'Mensuel',
      statut: 'Conforme'
    },
    {
      id: 4,
      code: 'TB-SST-01',
      nomProcessus: 'Santé & Sécurité au Travail',
      indicateurCle: 'Taux de fréquence des accidents',
      cible: '0',
      valeurActuelle: 2,
      unite: 'accidents',
      frequence: 'Trimestriel',
      statut: 'Non atteint'
    }
  ];

  // Options pour l'ajout d'une nouvelle ligne
  processusDisponibles = [
    'Management Stratégique & SMI',
    'Services aux Navires',
    'Manutention & Stockage des Marchandises',
    'Santé & Sécurité au Travail',
    'Environnement'
  ];

  addTableauLine() {
    const newId = this.tableauxList.length > 0 ? Math.max(...this.tableauxList.map(t => t.id)) + 1 : 1;
    this.tableauxList.push({
      id: newId,
      code: `TB-NEW-${newId}`,
      nomProcessus: '',
      indicateurCle: '',
      cible: '',
      valeurActuelle: 0,
      unite: '%',
      frequence: 'Mensuel',
      statut: 'Conforme'
    });
  }

  removeTableau(id: number) {
    this.tableauxList = this.tableauxList.filter(t => t.id !== id);
  }
}