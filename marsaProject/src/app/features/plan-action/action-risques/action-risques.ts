import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActionRisque {
  id: number;
  risqueConcerne: string; // Lien vers le risque identifié
  descriptionAction: string;
  responsable: string;
  delai: string;
  statut: 'Non commencée' | 'En cours' | 'Réalisée' | 'En retard';
}

@Component({
  selector: 'app-actions-risques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './action-risques.html',
  styleUrl: './action-risques.css'
})
export class ActionsRisques {
  // Liste des risques existants pour le menu déroulant
  risquesDisponibles: string[] = [
    'PR-OPS-02 : Chute de conteneur',
    'PR-FIN-03 : Erreur de saisie facturation',
    'PR-LOG-01 : Retard de livraison navire'
  ];

  // Liste des utilisateurs/responsables
  collaborateurs: string[] = [
    'Meryem Hajar',
    'Ahmed Alami',
    'Sanaa Benslimane',
    'Karim Tazi'
  ];

  // Liste des actions initiales
  actionsList: ActionRisque[] = [
    {
      id: 1,
      risqueConcerne: 'PR-OPS-02 : Chute de conteneur',
      descriptionAction: 'Inspection hebdomadaire des portiques et élingues',
      responsable: 'Ahmed Alami',
      delai: '2026-08-30',
      statut: 'En cours'
    },
    {
      id: 2,
      risqueConcerne: 'PR-FIN-03 : Erreur de saisie facturation',
      descriptionAction: 'Automatisation de l\'import des données de facturation',
      responsable: 'Meryem Hajar',
      delai: '2026-07-15',
      statut: 'Réalisée'
    }
  ];

  addActionLine() {
    const newId = this.actionsList.length > 0 ? Math.max(...this.actionsList.map(a => a.id)) + 1 : 1;
    this.actionsList.push({
      id: newId,
      risqueConcerne: '',
      descriptionAction: '',
      responsable: '',
      delai: '',
      statut: 'Non commencée'
    });
  }

  removeAction(id: number) {
    this.actionsList = this.actionsList.filter(action => action.id !== id);
  }
}