import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

interface ActionConformite {
  id: number;
  reference: string;
  exigenceLiee: string;
  ecartConstate: string;
  actionCorrective: string;
  responsable: string;
  echeance: string;
  budget: number;
  statut: 'À faire' | 'En cours' | 'Réalisée' | 'Retardée';
  avancement: number;
}

@Component({
  selector: 'app-mise-en-conformite',
  standalone: true,
  imports: [FormsModule,DecimalPipe],
  templateUrl: './mise-conf.html',
  styleUrl: './mise-conf.css'
})
export class MiseEnConformite {

  exigencesReferences: string[] = [
    'EXG-001',
    'EXG-002',
    'EXG-003'
  ];

  responsablesDisponibles: string[] = [
    'hajar',
    'mery',
    'Chef Exploitation',
    'Responsable QSSE',
    'Responsable HSE'
  ];

  actionsList: ActionConformite[] = [
    {
      id: 1,
      reference: 'MEC-001',
      exigenceLiee: 'EXG-002',
      ecartConstate: 'Registre des déchets dangereux incomplet sur le dernier trimestre',
      actionCorrective: 'Mettre à jour le registre et former le personnel concerné',
      responsable: 'Chef Exploitation',
      echeance: '2026-10-15',
      budget: 5000,
      statut: 'En cours',
      avancement: 45
    },
    {
      id: 2,
      reference: 'MEC-002',
      exigenceLiee: 'EXG-003',
      ecartConstate: 'Absence d\'audit interne réalisé sur l\'exercice en cours',
      actionCorrective: 'Planifier et réaliser l\'audit interne annuel du SMI',
      responsable: 'Responsable QSSE',
      echeance: '2026-12-01',
      budget: 0,
      statut: 'À faire',
      avancement: 0
    }
  ];

  private generateId(): number {
    return this.actionsList.length > 0
      ? Math.max(...this.actionsList.map(a => a.id)) + 1
      : 1;
  }

  addAction(): void {
    const num = this.actionsList.length + 1;
    this.actionsList.push({
      id: this.generateId(),
      reference: `MEC-${String(num).padStart(3, '0')}`,
      exigenceLiee: '',
      ecartConstate: '',
      actionCorrective: '',
      responsable: '',
      echeance: '',
      budget: 0,
      statut: 'À faire',
      avancement: 0
    });
  }

  removeAction(id: number): void {
    this.actionsList = this.actionsList.filter(a => a.id !== id);
  }

  get totalActions(): number {
    return this.actionsList.length;
  }

  get actionsRealisees(): number {
    return this.actionsList.filter(a => a.statut === 'Réalisée').length;
  }

  get actionsEnCours(): number {
    return this.actionsList.filter(a => a.statut === 'En cours').length;
  }

  get actionsRetardees(): number {
    return this.actionsList.filter(a => a.statut === 'Retardée').length;
  }

  get budgetTotal(): number {
    return this.actionsList.reduce((sum, a) => sum + (a.budget || 0), 0);
  }
}