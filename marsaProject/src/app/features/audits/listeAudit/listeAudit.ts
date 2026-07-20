import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

type StatutAudit = 'Planifié' | 'En cours' | 'Réalisé';
type StatutAction = 'À faire' | 'En cours' | 'Terminée';
type Priorite = 'Haute' | 'Moyenne' | 'Basse';

interface AuditListItem {
  id: string;
  reference: string;
  titre: string;
  terminal: string;
  type: 'Interne' | 'Externe';
  dateRealisation: string;
  statutAudit: StatutAudit;
}

interface ActionCorrective {
  id: string;
  description: string;
  responsable: string;
  echeance: string;
  priorite: Priorite;
  statut: StatutAction;
}

@Component({
  selector: 'app-liste-audit',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './listeAudit.html',
  styleUrl: './listeAudit.css'
})
export class ListeAudit {
  audits: AuditListItem[] = [
    {
      id: 'a1',
      reference: 'AUD-2026-001',
      titre: 'Audit qualité manutention conteneurs',
      terminal: 'Terminal à Conteneurs - Casablanca',
      type: 'Interne',
      dateRealisation: '2026-02-12',
      statutAudit: 'Réalisé'
    },
    {
      id: 'a2',
      reference: 'AUD-2026-002',
      titre: 'Audit sécurité opérations vrac solide',
      terminal: 'Terminal Vraquier - Jorf Lasfar',
      type: 'Externe',
      dateRealisation: '2026-05-07',
      statutAudit: 'En cours'
    },
    {
      id: 'a3',
      reference: 'AUD-2026-003',
      titre: 'Audit environnemental Terminal Nord',
      terminal: 'Terminal Nord - Tanger Med',
      type: 'Interne',
      dateRealisation: '2026-08-01',
      statutAudit: 'Planifié'
    }
  ];

  actionsParAudit: Record<string, ActionCorrective[]> = {
    a1: [
      { id: this.generateId(), description: 'Mettre en place un registre de contrôle des équipements de levage', responsable: 'Chef d\'exploitation quai', echeance: '2026-03-15', priorite: 'Haute', statut: 'En cours' },
      { id: this.generateId(), description: 'Former les équipes à la traçabilité des conteneurs', responsable: 'Responsable manutention', echeance: '2026-03-01', priorite: 'Moyenne', statut: 'Terminée' }
    ],
    a2: [
      { id: this.generateId(), description: 'Réviser la procédure de gestion des poussières', responsable: 'Service HSE', echeance: '2026-06-20', priorite: 'Haute', statut: 'À faire' }
    ],
    a3: []
  };

  auditSelectionne: AuditListItem = this.audits[0];
  recherche = '';

  get auditsFiltres(): AuditListItem[] {
    const q = this.recherche.toLowerCase().trim();
    if (!q) return this.audits;
    return this.audits.filter(a =>
      a.reference.toLowerCase().includes(q) ||
      a.titre.toLowerCase().includes(q) ||
      a.terminal.toLowerCase().includes(q)
    );
  }

  get actionsSelectionnees(): ActionCorrective[] {
    return this.actionsParAudit[this.auditSelectionne.id] ?? [];
  }

  get totalActionsOuvertes(): number {
    return this.actionsSelectionnees.filter(a => a.statut !== 'Terminée').length;
  }

  selectAudit(audit: AuditListItem): void {
    this.auditSelectionne = audit;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addAction(): void {
    const list = this.actionsParAudit[this.auditSelectionne.id] ?? [];
    list.push({
      id: this.generateId(),
      description: '',
      responsable: '',
      echeance: '',
      priorite: 'Moyenne',
      statut: 'À faire'
    });
    this.actionsParAudit[this.auditSelectionne.id] = list;
  }

  removeAction(id: string): void {
    const list = this.actionsParAudit[this.auditSelectionne.id] ?? [];
    this.actionsParAudit[this.auditSelectionne.id] = list.filter(a => a.id !== id);
  }

  toggleDone(action: ActionCorrective): void {
    action.statut = action.statut === 'Terminée' ? 'À faire' : 'Terminée';
  }

  isOverdue(action: ActionCorrective): boolean {
    if (action.statut === 'Terminée' || !action.echeance) return false;
    return new Date(action.echeance) < new Date();
  }

  auditStatutClass(statut: StatutAudit): string {
    switch (statut) {
      case 'Planifié': return 'badge--planned';
      case 'En cours': return 'badge--progress';
      case 'Réalisé': return 'badge--done';
    }
  }

  prioriteClass(p: Priorite): string {
    switch (p) {
      case 'Haute': return 'prio--high';
      case 'Moyenne': return 'prio--mid';
      case 'Basse': return 'prio--low';
    }
  }
}