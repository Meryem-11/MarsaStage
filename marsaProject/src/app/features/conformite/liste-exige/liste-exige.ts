import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Exigence {
  id: number;
  reference: string;
  texte: string;
  source: string;
  applicable: boolean;
  niveauConformite: 'Conforme' | 'Partiellement conforme' | 'Non conforme' | 'À évaluer';
  responsable: string;
  echeance: string;
}

@Component({
  selector: 'app-liste-exigences',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste-exige.html',
  styleUrl: './liste-exige.css'
})
export class ListeExigences {

  sourcesDisponibles: string[] = [
    'ISO 9001',
    'ISO 14001',
    'ISO 45001',
    'Réglementation nationale',
    'Cahier des charges client',
    'Règlement interne Marsa Maroc'
  ];

  responsablesDisponibles: string[] = [
    'Karim',
    'Ahmed',
    'Chef Exploitation',
    'Responsable QSSE',
    'Responsable HSE'
  ];

  exigencesList: Exigence[] = [
    {
      id: 1,
      reference: 'EXG-001',
      texte: 'Assurer la surveillance médicale périodique du personnel exposé au bruit',
      source: 'ISO 45001',
      applicable: true,
      niveauConformite: 'Conforme',
      responsable: 'Responsable HSE',
      echeance: '2026-09-30'
    },
    {
      id: 2,
      reference: 'EXG-002',
      texte: 'Tenir à jour le registre des déchets dangereux évacués du port',
      source: 'ISO 14001',
      applicable: true,
      niveauConformite: 'Partiellement conforme',
      responsable: 'Chef Exploitation',
      echeance: '2026-11-15'
    },
    {
      id: 3,
      reference: 'EXG-003',
      texte: 'Réaliser un audit interne annuel du système de management intégré',
      source: 'ISO 9001',
      applicable: true,
      niveauConformite: 'Non conforme',
      responsable: 'Responsable QSSE',
      echeance: '2026-12-01'
    }
  ];

  private generateId(): number {
    return this.exigencesList.length > 0
      ? Math.max(...this.exigencesList.map(e => e.id)) + 1
      : 1;
  }

  addExigence(): void {
    const num = this.exigencesList.length + 1;
    this.exigencesList.push({
      id: this.generateId(),
      reference: `EXG-${String(num).padStart(3, '0')}`,
      texte: '',
      source: '',
      applicable: true,
      niveauConformite: 'À évaluer',
      responsable: '',
      echeance: ''
    });
  }

  removeExigence(id: number): void {
    this.exigencesList = this.exigencesList.filter(e => e.id !== id);
  }

  get totalExigences(): number {
    return this.exigencesList.length;
  }

  get exigencesConformes(): number {
    return this.exigencesList.filter(e => e.niveauConformite === 'Conforme').length;
  }

  get exigencesPartielles(): number {
    return this.exigencesList.filter(e => e.niveauConformite === 'Partiellement conforme').length;
  }

  get exigencesNonConformes(): number {
    return this.exigencesList.filter(e => e.niveauConformite === 'Non conforme').length;
  }
}