import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

type TypeReclamation = 'Retard livraison' | 'Dommage marchandise' | 'Facturation' | 'Service client' | 'Autre';
type Priorite = 'Urgente' | 'Normale' | 'Faible';
type StatutReclamation = 'Nouvelle' | 'En cours' | 'Résolue' | 'Rejetée';

interface Reclamation {
  id: string;
  reference: string;
  client: string;
  terminal: string;
  type: TypeReclamation;
  objet: string;
  date: string;
  priorite: Priorite;
  statut: StatutReclamation;
}

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './tableau.html',
  styleUrl: './tableau.css'
})
export class Tableau {
  terminaux: string[] = [
    'Terminal à Conteneurs - Casablanca',
    'Terminal Polyvalent - Casablanca',
    'Terminal Vraquier - Jorf Lasfar',
    'Terminal Nord - Tanger Med',
    'Terminal Agadir',
    'Terminal Nador'
  ];

  types: TypeReclamation[] = ['Retard livraison', 'Dommage marchandise', 'Facturation', 'Service client', 'Autre'];

  reclamations: Reclamation[] = [
    {
      id: this.generateId(),
      reference: 'REC-2026-014',
      client: 'Atlas Trading SARL',
      terminal: 'Terminal à Conteneurs - Casablanca',
      type: 'Dommage marchandise',
      objet: 'Conteneur endommagé lors du déchargement, marchandise impactée',
      date: '2026-07-08',
      priorite: 'Urgente',
      statut: 'En cours'
    },
    {
      id: this.generateId(),
      reference: 'REC-2026-015',
      client: 'Maritime Logistics Co.',
      terminal: 'Terminal Nord - Tanger Med',
      type: 'Retard livraison',
      objet: 'Retard de 3 jours dans la mise à quai non communiqué',
      date: '2026-07-10',
      priorite: 'Normale',
      statut: 'Nouvelle'
    },
    {
      id: this.generateId(),
      reference: 'REC-2026-013',
      client: 'Sahara Import Export',
      terminal: 'Terminal Vraquier - Jorf Lasfar',
      type: 'Facturation',
      objet: 'Erreur sur les frais de stationnement facturés',
      date: '2026-07-02',
      priorite: 'Faible',
      statut: 'Résolue'
    }
  ];

  recherche = '';
  filtreStatut: StatutReclamation | 'Tous' = 'Tous';
  filtrePriorite: Priorite | 'Tous' = 'Tous';

  get reclamationsFiltrees(): Reclamation[] {
    const q = this.recherche.toLowerCase().trim();
    return this.reclamations.filter(r => {
      const matchQ = !q ||
        r.reference.toLowerCase().includes(q) ||
        r.client.toLowerCase().includes(q) ||
        r.objet.toLowerCase().includes(q);
      const matchStatut = this.filtreStatut === 'Tous' || r.statut === this.filtreStatut;
      const matchPriorite = this.filtrePriorite === 'Tous' || r.priorite === this.filtrePriorite;
      return matchQ && matchStatut && matchPriorite;
    });
  }

  get totalReclamations(): number {
    return this.reclamations.length;
  }

  get totalNouvelles(): number {
    return this.reclamations.filter(r => r.statut === 'Nouvelle').length;
  }

  get totalEnCours(): number {
    return this.reclamations.filter(r => r.statut === 'En cours').length;
  }

  get totalResolues(): number {
    return this.reclamations.filter(r => r.statut === 'Résolue').length;
  }

  get tauxResolution(): number {
    if (this.reclamations.length === 0) return 0;
    return Math.round((this.totalResolues / this.reclamations.length) * 100);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addReclamation(): void {
    const num = this.reclamations.length + 1;
    this.reclamations.unshift({
      id: this.generateId(),
      reference: `REC-2026-${String(num).padStart(3, '0')}`,
      client: '',
      terminal: this.terminaux[0],
      type: 'Autre',
      objet: '',
      date: new Date().toISOString().slice(0, 10),
      priorite: 'Normale',
      statut: 'Nouvelle'
    });
  }

  removeReclamation(id: string): void {
    this.reclamations = this.reclamations.filter(r => r.id !== id);
  }

  initiales(nom: string): string {
    if (!nom.trim()) return '?';
    return nom
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  }

  statutClass(statut: StatutReclamation): string {
    switch (statut) {
      case 'Nouvelle': return 'badge--new';
      case 'En cours': return 'badge--progress';
      case 'Résolue': return 'badge--resolved';
      case 'Rejetée': return 'badge--rejected';
    }
  }

  prioriteClass(p: Priorite): string {
    switch (p) {
      case 'Urgente': return 'prio--urgent';
      case 'Normale': return 'prio--normal';
      case 'Faible': return 'prio--low';
    }
  }
}