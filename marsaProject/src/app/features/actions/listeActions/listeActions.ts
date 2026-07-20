import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ActionPlan {
  id: string;
  reference: string;
  action: string;
  source: string;
  responsable: string;
  priorite: string;
  echeance: string;
  statut: string;
  avancement: number;
  preuve?: string;
  preuveUrl?: string;
}

@Component({
  selector: 'app-liste-actions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listeActions.html',
  styleUrl: './listeActions.css'
})
export class ListeActions {

  actions: ActionPlan[] = [
    {
      id: this.generateId(),
      reference: 'PA-001',
      action: 'Réduire le temps d’attente des camions',
      source: 'Réclamation client',
      responsable: 'Chef Exploitation',
      priorite: 'Élevée',
      echeance: '',
      statut: 'En cours',
      avancement: 60,
      preuve: ''
    }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addAction(): void {
    this.actions.push({
      id: this.generateId(),
      reference: `PA-00${this.actions.length + 1}`,
      action: '',
      source: '',
      responsable: '',
      priorite: 'Moyenne',
      echeance: '',
      statut: 'À faire',
      avancement: 0,
      preuve: ''
    });
  }

  removeAction(id: string): void {
  const index = this.actions.findIndex(a => a.id === id);

  if (index !== -1) {
    const item = this.actions[index];
    if (item.preuveUrl) {
      URL.revokeObjectURL(item.preuveUrl);
    }
    this.actions.splice(index, 1);
  }
}

  onFileSelected(event: Event, item: ActionPlan): void {
  const input = event.target as HTMLInputElement;

  if (input.files?.length) {
    const file = input.files[0];

    if (item.preuveUrl) {
      URL.revokeObjectURL(item.preuveUrl);
    }

    item.preuve = file.name;
    item.preuveUrl = URL.createObjectURL(file);
  }
}
downloadProof(item: ActionPlan): void {
  if (!item.preuveUrl) return;

  const link = document.createElement('a');
  link.href = item.preuveUrl;
  link.download = item.preuve ?? 'preuve';
  link.click();
}
get totalActions(): number {
    return this.actions.length;
  }

  get actionsAFaire(): number {
    return this.actions.filter(a => a.statut === 'À faire').length;
  }

  get actionsEnCours(): number {
    return this.actions.filter(a => a.statut === 'En cours').length;
  }

  get actionsTerminees(): number {
    return this.actions.filter(a => a.statut === 'Terminée').length;
  }
}