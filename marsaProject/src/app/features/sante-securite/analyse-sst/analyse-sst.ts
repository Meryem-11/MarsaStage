import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RisqueSST {
  id: number;
  zonePoste: string;
  danger: string;
  situationDangereuse: string;
  frequence: number; // Note de 1 à 4
  gravite: number;   // Note de 1 à 4
  criticite: number; // Calculé : F * G
  niveauRisque: 'Faible' | 'Moyen' | 'Élevé';
  mesuresPrevention: string;
}

@Component({
  selector: 'app-analyse-sst',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analyse-sst.html',
  styleUrl: './analyse-sst.css'
})
export class AnalyseSst {

  zonesPostes: string[] = [
    'Quai Nord - Manutention',
    'Zone de Stockage B',
    'Atelier de Maintenance',
    'Bureaux Administratifs',
    'Portique de déchargement'
  ];

  dangersCommuns: string[] = [
    'Chute de hauteur',
    'Écrasement par charge mobile',
    'Bruit continu élevé',
    'Électrisation (contact direct)',
    'Inhalation de poussières'
  ];

  sstRisquesList: RisqueSST[] = [
    {
      id: 1,
      zonePoste: 'Quai Nord - Manutention',
      danger: 'Écrasement par charge mobile',
      situationDangereuse: 'Déplacement de chariots élévateurs sans signalisation claire',
      frequence: 2,
      gravite: 4,
      criticite: 8,
      niveauRisque: 'Élevé',
      mesuresPrevention: 'Mise en place de zones piétonnes peintes au sol et avertisseurs sonores'
    },
    {
      id: 2,
      zonePoste: 'Atelier de Maintenance',
      danger: 'Bruit continu élevé',
      situationDangereuse: 'Utilisation prolongée de machines de découpe',
      frequence: 3,
      gravite: 2,
      criticite: 6,
      niveauRisque: 'Moyen',
      mesuresPrevention: 'Distribution et port obligatoire de casques anti-bruit (EPI)'
    }
  ];

  // Statistiques calculées
  get totalRisques() { return this.sstRisquesList.length; }
  get risquesEleves() { return this.sstRisquesList.filter(r => r.niveauRisque === 'Élevé').length; }
  get risquesMoyens() { return this.sstRisquesList.filter(r => r.niveauRisque === 'Moyen').length; }
  get risquesFaibles() { return this.sstRisquesList.filter(r => r.niveauRisque === 'Faible').length; }

  // Recalculer la criticité lors d'un changement de F ou G
  onNoteChange(risque: RisqueSST) {
    risque.criticite = risque.frequence * risque.gravite;
    
    if (risque.criticite >= 8) {
      risque.niveauRisque = 'Élevé';
    } else if (risque.criticite >= 4) {
      risque.niveauRisque = 'Moyen';
    } else {
      risque.niveauRisque = 'Faible';
    }
  }

  addSSTLine() {
    const newId = this.sstRisquesList.length > 0 ? Math.max(...this.sstRisquesList.map(r => r.id)) + 1 : 1;
    this.sstRisquesList.push({
      id: newId,
      zonePoste: '',
      danger: '',
      situationDangereuse: '',
      frequence: 1,
      gravite: 1,
      criticite: 1,
      niveauRisque: 'Faible',
      mesuresPrevention: ''
    });
  }

  removeSSTLine(id: number) {
    this.sstRisquesList = this.sstRisquesList.filter(r => r.id !== id);
  }
}