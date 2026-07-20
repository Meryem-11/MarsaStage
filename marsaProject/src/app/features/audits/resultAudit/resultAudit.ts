import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

type Categorie = 'Non-conformité majeure' | 'Non-conformité mineure' | 'Observation' | 'Point fort';
type StatutConstat = 'Ouvert' | 'En traitement' | 'Clôturé';

interface Constat {
  id: string;
  categorie: Categorie;
  description: string;
  exigence: string;
  responsable: string;
  echeance: string;
  statut: StatutConstat;
  expanded: boolean;
}

interface AuditRefOption {
  reference: string;
  titre: string;
  terminal: string;
  dateRealisation: string;
}

@Component({
  selector: 'app-result-audit',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './resultAudit.html',
  styleUrl: './resultAudit.css'
})
export class ResultAudit {
  auditsDisponibles: AuditRefOption[] = [
    { reference: 'AUD-2026-001', titre: 'Audit qualité manutention conteneurs', terminal: 'Terminal à Conteneurs - Casablanca', dateRealisation: '2026-02-12' }
  ];

  auditSelectionne: AuditRefOption = this.auditsDisponibles[0];

  categories: Categorie[] = ['Non-conformité majeure', 'Non-conformité mineure', 'Observation', 'Point fort'];
  filtreCategorie: Categorie | 'Tous' = 'Tous';

  constats: Constat[] = [
    {
      id: this.generateId(),
      categorie: 'Non-conformité majeure',
      description: 'Absence de contrôle documenté des équipements de levage sur le quai 3',
      exigence: 'ISO 9001 §8.5.1 — Maîtrise des équipements',
      responsable: 'Chef d\'exploitation quai',
      echeance: '2026-03-15',
      statut: 'Ouvert',
      expanded: false
    },
    {
      id: this.generateId(),
      categorie: 'Non-conformité mineure',
      description: 'Fiches de traçabilité incomplètes pour 2 conteneurs sur 15 vérifiés',
      exigence: 'Procédure interne PR-QSE-012',
      responsable: 'Responsable manutention',
      echeance: '2026-03-01',
      statut: 'En traitement',
      expanded: false
    },
    {
      id: this.generateId(),
      categorie: 'Point fort',
      description: 'Excellente réactivité de l\'équipe lors des simulations d\'incident',
      exigence: '—',
      responsable: '—',
      echeance: '—',
      statut: 'Clôturé',
      expanded: false
    }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  get constatsFiltres(): Constat[] {
    if (this.filtreCategorie === 'Tous') return this.constats;
    return this.constats.filter(c => c.categorie === this.filtreCategorie);
  }

  countByCategorie(cat: Categorie): number {
    return this.constats.filter(c => c.categorie === cat).length;
  }

  get scoreGlobal(): number {
    const poids: Record<Categorie, number> = {
      'Non-conformité majeure': -20,
      'Non-conformité mineure': -8,
      'Observation': -2,
      'Point fort': 5
    };
    const base = 100;
    const impact = this.constats.reduce((sum, c) => sum + poids[c.categorie], 0);
    return Math.max(0, Math.min(100, base + impact));
  }

  get scoreColor(): string {
    if (this.scoreGlobal >= 80) return '#22c55e';
    if (this.scoreGlobal >= 60) return '#f59e0b';
    return '#ef4444';
  }

  get scoreLabel(): string {
    if (this.scoreGlobal >= 80) return 'Conforme';
    if (this.scoreGlobal >= 60) return 'Conforme avec réserves';
    return 'Non conforme';
  }

  toggleExpand(constat: Constat): void {
    constat.expanded = !constat.expanded;
  }

  addConstat(): void {
    this.constats.push({
      id: this.generateId(),
      categorie: 'Observation',
      description: '',
      exigence: '',
      responsable: '',
      echeance: '',
      statut: 'Ouvert',
      expanded: true
    });
  }

  removeConstat(id: string): void {
    this.constats = this.constats.filter(c => c.id !== id);
  }

  categorieClass(cat: Categorie): string {
    switch (cat) {
      case 'Non-conformité majeure': return 'tag--major';
      case 'Non-conformité mineure': return 'tag--minor';
      case 'Observation': return 'tag--obs';
      case 'Point fort': return 'tag--strength';
    }
  }

  statutClass(statut: StatutConstat): string {
    switch (statut) {
      case 'Ouvert': return 'status--open';
      case 'En traitement': return 'status--progress';
      case 'Clôturé': return 'status--closed';
    }
  }
}