import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type GraviteNC = 'Mineure' | 'Majeure' | 'Critique';
type StatutNC = 'Ouverte' | 'En analyse' | 'Action en cours' | 'En vérification' | 'Clôturée';

interface NonConformite {
  id: number;
  numero: string;
  titre: string;
  processus: string;
  gravite: GraviteNC;
  detecteePar: string;
  dateDetection: string;
  responsable: string;
  echeance: string;
  statut: StatutNC;
}

@Component({
  selector: 'app-liste-non-conformites',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listes-non-conf.html',
  styleUrl: './listes-non-conf.css'
})
export class ListeNonConformites {

  processusDisponibles: string[] = [
    'Exploitation portuaire',
    'Maintenance',
    'Ressources humaines',
    'Achats',
    'HSE'
  ];

  responsablesDisponibles: string[] = [
    'Chef Exploitation',
    'Responsable QSSE',
    'Responsable HSE',
    'Directeur Port'
  ];

  nonConformites: NonConformite[] = [
    {
      id: 1,
      numero: 'NC-2026-014',
      titre: 'Non-respect de la procédure de consignation avant maintenance',
      processus: 'Maintenance',
      gravite: 'Majeure',
      detecteePar: 'Audit interne',
      dateDetection: '2026-06-12',
      responsable: 'Chef Exploitation',
      echeance: '2026-08-01',
      statut: 'Action en cours'
    },
    {
      id: 2,
      numero: 'NC-2026-015',
      titre: 'Absence de fiche de données de sécurité pour un produit chimique stocké',
      processus: 'HSE',
      gravite: 'Critique',
      detecteePar: 'Inspection HSE',
      dateDetection: '2026-07-02',
      responsable: 'Responsable HSE',
      echeance: '2026-07-20',
      statut: 'Ouverte'
    },
    {
      id: 3,
      numero: 'NC-2026-009',
      titre: 'Retard récurrent dans la validation des bons de commande',
      processus: 'Achats',
      gravite: 'Mineure',
      detecteePar: 'Réclamation interne',
      dateDetection: '2026-04-18',
      responsable: 'Directeur Port',
      echeance: '2026-05-30',
      statut: 'Clôturée'
    }
  ];

  private generateId(): number {
    return this.nonConformites.length > 0 ? Math.max(...this.nonConformites.map(n => n.id)) + 1 : 1;
  }

  addNonConformite(): void {
    const num = this.nonConformites.length + 1;
    this.nonConformites.unshift({
      id: this.generateId(),
      numero: `NC-2026-${String(num).padStart(3, '0')}`,
      titre: '',
      processus: '',
      gravite: 'Mineure',
      detecteePar: '',
      dateDetection: new Date().toISOString().split('T')[0],
      responsable: '',
      echeance: '',
      statut: 'Ouverte'
    });
  }

  removeNonConformite(id: number): void {
    this.nonConformites = this.nonConformites.filter(n => n.id !== id);
  }

  etapeIndex(statut: StatutNC): number {
    const ordre: StatutNC[] = ['Ouverte', 'En analyse', 'Action en cours', 'En vérification', 'Clôturée'];
    return ordre.indexOf(statut);
  }

  get total(): number {
    return this.nonConformites.length;
  }

  get critiques(): number {
    return this.nonConformites.filter(n => n.gravite === 'Critique').length;
  }

  get ouvertes(): number {
    return this.nonConformites.filter(n => n.statut !== 'Clôturée').length;
  }

  get cloturees(): number {
    return this.nonConformites.filter(n => n.statut === 'Clôturée').length;
  }
}