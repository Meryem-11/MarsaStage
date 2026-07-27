import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanActionService, PlanAction } from '../plan-action.service';

@Component({
  selector: 'app-liste-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listeActions.html',
  styleUrl: './listeActions.css'
})
export class ListeActions implements OnInit {

  actions: PlanAction[] = [];
  selectedFiles: { [key: number | string]: File } = {};

  constructor(private planActionService: PlanActionService) {}

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    this.planActionService.getAll().subscribe({
      next: (data) => this.actions = data,
      error: (err) => console.error('Erreur lors du chargement des actions:', err)
    });
  }

  // 1. Ajouter une nouvelle ligne vide uniquement dans le tableau (sans appel API)
  addAction(): void {
    const newAction: PlanAction = {
      intitule: '',
      responsable: '',
      priorite: 'MOYENNE',
      echeance: new Date().toISOString().split('T')[0],
      statut: 'A_FAIRE'
    };

    // On l'ajoute au début du tableau pour la remplir facilement
    this.actions.unshift(newAction);
  }

  // 2. Sauvegarder (Création si nouvelle action, Modification si elle existe déjà)
  saveAction(action: PlanAction, index: number): void {
    if (!action.intitule || action.intitule.trim() === '') {
      alert('Veuillez renseigner au moins l\'intitulé de l\'action.');
      return;
    }

    if (action.idAction) {
      // --- CAS 1 : Action existante -> MISE À JOUR (PUT) ---
      const idAction = action.idAction;
      this.planActionService.update(idAction, action).subscribe({
        next: (updated) => {
          if (this.selectedFiles[idAction]) {
            this.uploadFileForAction(idAction);
          } else {
            alert('Action mise à jour avec succès !');
            this.loadActions();
          }
        },
        error: (err) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else {
      // --- CAS 2 : Nouvelle action -> CRÉATION (POST) ---
      this.planActionService.create(action).subscribe({
        next: (createdAction) => {
          // Si un fichier a été sélectionné pour la nouvelle action avant l'enregistrement
          if (createdAction.idAction && this.selectedFiles['temp']) {
            const file = this.selectedFiles['temp'];
            delete this.selectedFiles['temp'];
            this.selectedFiles[createdAction.idAction] = file;
            this.uploadFileForAction(createdAction.idAction);
          } else {
            alert('Nouvelle action enregistrée en BDD avec succès !');
            this.loadActions();
          }
        },
        error: (err) => console.error('Erreur lors de la création:', err)
      });
    }
  }

  removeAction(action: PlanAction, index: number): void {
    // Si l'action n'a pas encore d'idAction (non enregistrée en BDD), on la retire du tableau local
    if (!action.idAction) {
      this.actions.splice(index, 1);
      return;
    }

    const idAction = action.idAction;
    if (confirm('Voulez-vous vraiment supprimer cette action ?')) {
      this.planActionService.delete(idAction).subscribe({
        next: () => {
          this.actions = this.actions.filter(a => a.idAction !== idAction);
        },
        error: (err) => console.error('Erreur de suppression:', err)
      });
    }
  }

  onFileSelected(event: Event, action: PlanAction): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const key = action.idAction ? action.idAction : 'temp';
      this.selectedFiles[key] = file;
      action.preuveNom = file.name;
    }
  }

  uploadFileForAction(idAction: number): void {
    const file = this.selectedFiles[idAction];
    if (!file) return;

    this.planActionService.uploadPreuve(idAction, file).subscribe({
      next: () => {
        delete this.selectedFiles[idAction];
        alert('Action et preuve enregistrées avec succès !');
        this.loadActions();
      },
      error: (err) => console.error('Erreur upload fichier:', err)
    });
  }

  // --- Statistiques ---
  get totalActions(): number {
    return this.actions.length;
  }

  get actionsAFaire(): number {
    return this.actions.filter(a => a.statut === 'A_FAIRE').length;
  }

  get actionsEnCours(): number {
    return this.actions.filter(a => a.statut === 'EN_COURS').length;
  }

  get actionsTerminees(): number {
    return this.actions.filter(a => a.statut === 'TERMINEE').length;
  }
}