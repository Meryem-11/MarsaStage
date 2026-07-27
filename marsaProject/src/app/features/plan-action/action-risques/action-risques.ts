import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ActionRisqueService } from './action-risque.service';
import { ActionRisque } from './action-risque.model';
import { RisqueService } from '../analyse-des-risques/risque.service';
import { Risque } from '../analyse-des-risques/risque.model';

@Component({
  selector: 'app-actions-risques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './action-risques.html',
  styleUrl: './action-risques.css'
})
export class ActionsRisques implements OnInit {

  risquesDisponibles: Risque[] = [];
  collaborateurs: string[] = [
    'Meryem Hajar',
    'Ahmed Alami',
    'Sanaa Benslimane',
    'Karim Tazi'
  ];
  actionsList: ActionRisque[] = [];

  // Gestion de la Modal
  isModalOpen = false;
  isEditMode = false;
  currentAction: ActionRisque = this.getEmptyAction();

  constructor(
    private actionService: ActionRisqueService,
    private risqueService: RisqueService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      risques: this.risqueService.getAll(),
      actions: this.actionService.getAll()
    }).subscribe({
      next: (res: { risques: any[]; actions: any[] }) => {
        this.risquesDisponibles = res.risques.map(r => ({
          ...r,
          idRisque: r.idRisque ?? r.id
        }));

        this.actionsList = res.actions.map(a => ({
          ...a,
          idAction: a.idAction ?? a.id,
          risque: typeof a.risque === 'object' && a.risque !== null
            ? { ...a.risque, idRisque: a.risque.idRisque ?? a.risque.id }
            : { idRisque: a.risque }
        }));
      },
      error: (err: HttpErrorResponse) => console.error('Erreur chargement BDD :', err)
    });
  }

  getEmptyAction(): ActionRisque {
    const defaultRisqueId = this.risquesDisponibles[0]?.idRisque ?? (this.risquesDisponibles[0] as any)?.id ?? 0;
    return {
      risque: { idRisque: defaultRisqueId },
      descriptionAction: '',
      responsable: '',
      delai: '',
      statut: 'Non commencée'
    };
  }

  openAddModal(): void {
    if (this.risquesDisponibles.length === 0) {
      alert("Aucun risque disponible. Veuillez d'abord enregistrer un risque.");
      return;
    }
    this.isEditMode = false;
    this.currentAction = this.getEmptyAction();
    this.isModalOpen = true;
  }

  openEditModal(action: ActionRisque): void {
    this.isEditMode = true;
    const currentRisqueId = this.getRisqueId(action) ?? 0;
    
    // Copie profonde pour éviter d'impacter la ligne avant l'enregistrement
    this.currentAction = {
      ...action,
      risque: { idRisque: currentRisqueId }
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveActionModal(): void {
    if (!this.currentAction.descriptionAction?.trim()) {
      alert("La description de l'action est obligatoire !");
      return;
    }

    // Sécurisation de l'ID du risque sélectionné
    if (this.currentAction.risque) {
      this.currentAction.risque.idRisque = Number(this.currentAction.risque.idRisque);
    }

    const idToUpdate = this.currentAction.idAction ?? (this.currentAction as any).id;

    if (this.isEditMode && idToUpdate) {
      // Modification
      this.actionService.update(idToUpdate, this.currentAction).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => console.error('Erreur mise à jour action :', err)
      });
    } else {
      // Création
      this.actionService.create(this.currentAction).subscribe({
        next: () => {
          this.loadData();
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => console.error('Erreur création action :', err)
      });
    }
  }

  removeAction(action: ActionRisque): void {
    const idToDelete = action.idAction ?? (action as any).id;
    if (!idToDelete) return;

    if (confirm('Voulez-vous vraiment supprimer cette action ?')) {
      this.actionService.delete(idToDelete).subscribe({
        next: () => {
          this.actionsList = this.actionsList.filter(a => (a.idAction ?? (a as any).id) !== idToDelete);
        },
        error: (err: HttpErrorResponse) => console.error('Erreur suppression action :', err)
      });
    }
  }

  getRisqueId(action: ActionRisque): number | undefined {
    if (!action.risque) return undefined;
    return (action.risque as any).idRisque ?? (action.risque as any).id;
  }

  labelRisque(risque: Risque): string {
    return `${risque.code || 'R'} : ${risque.description || ''}`;
  }

  getRisqueLabelByAction(action: ActionRisque): string {
    const rId = this.getRisqueId(action);
    const risque = this.risquesDisponibles.find(r => (r.idRisque ?? (r as any).id) === rId);
    return risque ? this.labelRisque(risque) : `Risque #${rId ?? '-'}`;
  }

  trackById(index: number, item: any): number {
    return item?.idAction ?? item?.idRisque ?? item?.id ?? index;
  }
}