import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActionSST {
  id: number;
  ref: string;
  actionMener: string;
  risqueAssocie: string;
  responsable: string;
  delai: string;
  budget: number;
  avancement: number; // Pourcentage de 0 à 100
  statut: 'Non commencée' | 'En cours' | 'Réalisée' | 'Annulée';
}

@Component({
  selector: 'app-programme-sst',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prog-sst.html',
  styleUrl: './prog-sst.css'
})
export class ProgrammeSst {

  risquesSstIdentifies: string[] = [
    'Écrasement par charge mobile (Quai Nord)',
    'Chute de hauteur (Portique de déchargement)',
    'Bruit continu élevé (Atelier maintenance)',
    'Électrisation (Armoires électriques)'
  ];

  collaborateurs: string[] = [
    'Ahmed Alami',
    'Meryem Hajar',
    'Sanaa Benslimane',
    'Karim Tazi'
  ];

  actionsSstList: ActionSST[] = [
    {
      id: 1,
      ref: 'ACT-SST-01',
      actionMener: 'Achat et distribution de casques anti-bruit haute performance',
      risqueAssocie: 'Bruit continu élevé (Atelier maintenance)',
      responsable: 'Karim Tazi',
      delai: '2026-08-15',
      budget: 1200,
      avancement: 100,
      statut: 'Réalisée'
    },
    {
      id: 2,
      ref: 'ACT-SST-02',
      actionMener: 'Installation de lignes de vie sur le portique de déchargement',
      risqueAssocie: 'Chute de hauteur (Portique de déchargement)',
      responsable: 'Ahmed Alami',
      delai: '2026-10-30',
      budget: 15000,
      avancement: 40,
      statut: 'En cours'
    }
  ];

  // Calculs statistiques pour les cartes KPI
  get totalActions() { return this.actionsSstList.length; }
  get actionsRealisees() { return this.actionsSstList.filter(a => a.statut === 'Réalisée').length; }
  get actionsEnCours() { return this.actionsSstList.filter(a => a.statut === 'En cours').length; }
  get budgetTotal() { return this.actionsSstList.reduce((sum, a) => sum + (a.budget || 0), 0); }

  onStatutChange(action: ActionSST) {
    if (action.statut === 'Réalisée') {
      action.avancement = 100;
    } else if (action.statut === 'Non commencée') {
      action.avancement = 0;
    }
  }

  onAvancementChange(action: ActionSST) {
    if (action.avancement === 100) {
      action.statut = 'Réalisée';
    } else if (action.avancement > 0 && action.avancement < 100) {
      action.statut = 'En cours';
    } else if (action.avancement === 0) {
      action.statut = 'Non commencée';
    }
  }

  addActionSST() {
    const newId = this.actionsSstList.length > 0 ? Math.max(...this.actionsSstList.map(a => a.id)) + 1 : 1;
    const nextRef = `ACT-SST-${String(newId).padStart(2, '0')}`;
    
    this.actionsSstList.push({
      id: newId,
      ref: nextRef,
      actionMener: '',
      risqueAssocie: '',
      responsable: '',
      delai: '',
      budget: 0,
      avancement: 0,
      statut: 'Non commencée'
    });
  }

  removeActionSST(id: number) {
    this.actionsSstList = this.actionsSstList.filter(a => a.id !== id);
  }
}