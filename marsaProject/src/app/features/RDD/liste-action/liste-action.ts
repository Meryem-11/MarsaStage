import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ActionRDD {
  id: number;
  reference: string;
  sessionOrigine: string;
  decision: string;
  responsable: string;
  echeance: string;
  statut: 'À faire' | 'En cours' | 'Terminée';
}

@Component({
  selector: 'app-liste-actions-rdd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste-action.html',
  styleUrl: './liste-action.css'
})
export class ListeActionsRdd {

  sessionsDisponibles: string[] = ['RDD-2026-00', 'RDD-2026-01'];

  responsablesDisponibles: string[] = [
    'Directeur Port',
    'Chef Exploitation',
    'Responsable QSSE',
    'Responsable HSE'
  ];

  actions: ActionRDD[] = [
    {
      id: 1,
      reference: 'ARD-001',
      sessionOrigine: 'RDD-2026-00',
      decision: 'Lancer la démarche de certification ISO 45001',
      responsable: 'Responsable QSSE',
      echeance: '2026-09-30',
      statut: 'En cours'
    },
    {
      id: 2,
      reference: 'ARD-002',
      sessionOrigine: 'RDD-2026-00',
      decision: 'Renforcer la formation sécurité des équipes de manutention',
      responsable: 'Responsable HSE',
      echeance: '2026-08-15',
      statut: 'À faire'
    },
    {
      id: 3,
      reference: 'ARD-003',
      sessionOrigine: 'RDD-2026-00',
      decision: 'Réviser la procédure de gestion des réclamations clients',
      responsable: 'Chef Exploitation',
      echeance: '2026-07-01',
      statut: 'Terminée'
    }
  ];

  private generateId(): number {
    return this.actions.length > 0 ? Math.max(...this.actions.map(a => a.id)) + 1 : 1;
  }

  addAction(): void {
    const num = this.actions.length + 1;
    this.actions.push({
      id: this.generateId(),
      reference: `ARD-${String(num).padStart(3, '0')}`,
      sessionOrigine: '',
      decision: '',
      responsable: '',
      echeance: '',
      statut: 'À faire'
    });
  }

  removeAction(id: number): void {
    this.actions = this.actions.filter(a => a.id !== id);
  }

  actionsParStatut(statut: ActionRDD['statut']): ActionRDD[] {
    return this.actions.filter(a => a.statut === statut);
  }

  get totalActions(): number {
    return this.actions.length;
  }
}