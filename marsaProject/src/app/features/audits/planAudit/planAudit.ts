import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface EquipeMembre {
  id: string;
  nom: string;
  role: string;
}

interface PlanningActivite {
  id: string;
  jour: string;
  horaire: string;
  activite: string;
}

interface AuditRefOption {
  reference: string;
  titre: string;
  terminal: string;
}

@Component({
  selector: 'app-plan-audit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './planAudit.html',
  styleUrl: './planAudit.css'
})
export class PlanAudit {
  // Simule la liste des audits venant du programme annuel (à remplacer par un appel service plus tard)
  auditsDisponibles: AuditRefOption[] = [
    { reference: 'AUD-2026-001', titre: 'Audit qualité manutention conteneurs', terminal: 'Terminal à Conteneurs - Agadir' },
    { reference: 'AUD-2026-002', titre: 'Audit sécurité opérations vrac solide', terminal: 'Terminal Vraquier - Agadir' }
  ];

  auditSelectionne: AuditRefOption = this.auditsDisponibles[0];

  objectifs = '';
  perimetre = '';
  criteres = '';

  equipe: EquipeMembre[] = [
    { id: this.generateId(), nom: '', role: 'Auditeur principal' }
  ];

  planning: PlanningActivite[] = [
    { id: this.generateId(), jour: 'Jour 1', horaire: '09:00', activite: 'Réunion d\'ouverture' }
  ];

  rolesDisponibles = ['Auditeur principal', 'Auditeur', 'Observateur', 'Expert technique'];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  onAuditChange(reference: string): void {
    const found = this.auditsDisponibles.find(a => a.reference === reference);
    if (found) this.auditSelectionne = found;
  }

  addEquipeMembre(): void {
    this.equipe.push({ id: this.generateId(), nom: '', role: 'Auditeur' });
  }

  removeEquipeMembre(id: string): void {
    this.equipe = this.equipe.filter(m => m.id !== id);
  }

  addPlanningActivite(): void {
    this.planning.push({ id: this.generateId(), jour: '', horaire: '', activite: '' });
  }

  removePlanningActivite(id: string): void {
    this.planning = this.planning.filter(p => p.id !== id);
  }

  get progression(): number {
    let filled = 0;
    const total = 3;
    if (this.objectifs.trim()) filled++;
    if (this.perimetre.trim()) filled++;
    if (this.criteres.trim()) filled++;
    return Math.round((filled / total) * 100);
  }
}