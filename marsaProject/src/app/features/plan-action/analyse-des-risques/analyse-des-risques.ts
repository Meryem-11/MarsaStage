import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Risque {
  id: number;
  processus: string;
  description: string;
  cause: string;
  probabilite: number; // Échelle de 1 à 4
  gravite: number;     // Échelle de 1 à 4
  criticite: number;   // P * G (Calculé automatiquement)
  niveauRisque: 'Faible' | 'Moyen' | 'Élevé' | 'Critique';
  mesurePrevention: string;
}

@Component({
  selector: 'app-analyse-risques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analyse-des-risques.html', // Corrigé ici
  styleUrl: './analyse-des-risques.css'      // Corrigé ici
})
export class AnalyseRisques {
  
  // Liste des processus pour le menu déroulant
  processusDisponibles: string[] = [
    'PR-MNG-01: Management Stratégique',
    'PR-OPS-01: Services aux Navires',
    'PR-OPS-02: Manutention',
    'PR-FIN-03: Facturation',
    'PR-SUP-01: Maintenance',
    'PR-SUP-02: Management SST'
  ];

  risquesList: Risque[] = [
    {
      id: 1,
      processus: 'PR-OPS-02: Manutention',
      description: 'Chute de conteneur lors du déchargement',
      cause: 'Panne mécanique ou erreur de guidage du portique',
      probabilite: 2,
      gravite: 4,
      criticite: 8,
      niveauRisque: 'Élevé',
      mesurePrevention: 'Inspection hebdomadaire des câbles et formation des portiqueurs'
    },
    {
      id: 2,
      processus: 'PR-FIN-03: Facturation',
      description: 'Erreur de saisie des données de facturation',
      cause: "Saisie manuelle fastidieuse sur l'ancien outil",
      probabilite: 3,
      gravite: 2,
      criticite: 6,
      niveauRisque: 'Moyen',
      mesurePrevention: 'Automatisation de la passerelle de saisie EDI'
    }
  ];

  // Ajouter un nouveau risque directement sous forme de ligne vide
  addRisqueLine() {
    const newId = this.risquesList.length > 0 ? Math.max(...this.risquesList.map(r => r.id)) + 1 : 1;
    const newRisque: Risque = {
      id: newId,
      processus: '',
      description: '',
      cause: '',
      probabilite: 1,
      gravite: 1,
      criticite: 1,
      niveauRisque: 'Faible',
      mesurePrevention: ''
    };
    this.risquesList.push(newRisque);
  }

  // Suppression d'un risque
  removeRisque(id: number) {
    this.risquesList = this.risquesList.filter(r => r.id !== id);
  }

  // Recalculer automatiquement la criticité et le niveau associé lors du changement de P ou G
  updateCriticite(risque: Risque) {
    risque.criticite = risque.probabilite * risque.gravite;
    
    if (risque.criticite >= 12) {
      risque.niveauRisque = 'Critique';
    } else if (risque.criticite >= 8) {
      risque.niveauRisque = 'Élevé';
    } else if (risque.criticite >= 4) {
      risque.niveauRisque = 'Moyen';
    } else {
      risque.niveauRisque = 'Faible';
    }
  }
}