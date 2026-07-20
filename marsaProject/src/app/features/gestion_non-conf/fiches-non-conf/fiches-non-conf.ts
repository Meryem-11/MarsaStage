import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type GraviteNC = 'Mineure' | 'Majeure' | 'Critique';
type StatutNC = 'Ouverte' | 'En analyse' | 'Action en cours' | 'En vérification' | 'Clôturée';

interface Pourquoi {
  id: number;
  texte: string;
}

interface FicheNC {
  id: number;
  numero: string;
  titre: string;
  gravite: GraviteNC;
  statut: StatutNC;
  processus: string;
  detecteePar: string;
  dateDetection: string;
  description: string;
  pourquois: Pourquoi[];
  causeRacine: string;
  actionImmediate: string;
  actionCorrective: string;
  responsableAction: string;
  echeanceAction: string;
  verificationEfficacite: string;
  dateCloture: string;
  expanded: boolean;
}

@Component({
  selector: 'app-fiche-non-conformite',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fiches-non-conf.html',
  styleUrl: './fiches-non-conf.css'
})
export class FicheNonConformite {

  etapes: StatutNC[] = ['Ouverte', 'En analyse', 'Action en cours', 'En vérification', 'Clôturée'];

  fiches: FicheNC[] = [
    {
      id: 1,
      numero: 'NC-2026-015',
      titre: 'Absence de fiche de données de sécurité pour un produit chimique stocké',
      gravite: 'Critique',
      statut: 'En analyse',
      processus: 'HSE',
      detecteePar: 'Inspection HSE',
      dateDetection: '2026-07-02',
      description: 'Un produit chimique a été retrouvé stocké en zone B sans fiche de données de sécurité (FDS) accessible à proximité, en violation de la procédure de gestion des produits dangereux.',
      pourquois: [
        { id: 1, texte: 'La FDS n\'était pas affichée sur le lieu de stockage' },
        { id: 2, texte: 'Le produit a été réceptionné hors de la procédure standard d\'admission' }
      ],
      causeRacine: '',
      actionImmediate: 'Isolement du produit et affichage temporaire d\'une FDS provisoire',
      actionCorrective: '',
      responsableAction: 'Responsable HSE',
      echeanceAction: '2026-07-20',
      verificationEfficacite: '',
      dateCloture: '',
      expanded: true
    }
  ];

  private generateId(): number {
    return this.fiches.length > 0 ? Math.max(...this.fiches.map(f => f.id)) + 1 : 1;
  }

  addFiche(): void {
    const num = this.fiches.length + 1;
    this.fiches.unshift({
      id: this.generateId(),
      numero: `NC-2026-${String(num).padStart(3, '0')}`,
      titre: '',
      gravite: 'Mineure',
      statut: 'Ouverte',
      processus: '',
      detecteePar: '',
      dateDetection: new Date().toISOString().split('T')[0],
      description: '',
      pourquois: [{ id: 1, texte: '' }],
      causeRacine: '',
      actionImmediate: '',
      actionCorrective: '',
      responsableAction: '',
      echeanceAction: '',
      verificationEfficacite: '',
      dateCloture: '',
      expanded: true
    });
  }

  removeFiche(id: number): void {
    this.fiches = this.fiches.filter(f => f.id !== id);
  }

  toggleFiche(fiche: FicheNC): void {
    fiche.expanded = !fiche.expanded;
  }

  addPourquoi(fiche: FicheNC): void {
    const newId = fiche.pourquois.length > 0 ? Math.max(...fiche.pourquois.map(p => p.id)) + 1 : 1;
    if (fiche.pourquois.length < 5) {
      fiche.pourquois.push({ id: newId, texte: '' });
    }
  }

  removePourquoi(fiche: FicheNC, id: number): void {
    fiche.pourquois = fiche.pourquois.filter(p => p.id !== id);
  }

  etapeIndex(statut: StatutNC): number {
    return this.etapes.indexOf(statut);
  }
}