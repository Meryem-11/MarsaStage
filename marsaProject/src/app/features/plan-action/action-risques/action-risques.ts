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

  constructor(
    private actionService: ActionRisqueService,
    private risqueService: RisqueService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Charger d'abord les risques ET les actions en parallèle sans conflit de temps
  loadData(): void {
    forkJoin({
      risques: this.risqueService.getAll(),
      actions: this.actionService.getAll()
    }).subscribe({
      next: (res: { risques: any[]; actions: any[] }) => {

        // 1. Normalisation des Risques (convertit id en idRisque si besoin)
        this.risquesDisponibles = res.risques.map(r => ({
          ...r,
          idRisque: r.idRisque ?? r.id
        }));

        // 2. Normalisation des Actions (convertit id en idAction et formate le risque imbriqué)
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

  addActionLine(): void {
    if (this.risquesDisponibles.length === 0) {
      console.error('Aucun risque disponible pour créer une action.');
      return;
    }

    const firstRisqueId = this.risquesDisponibles[0].idRisque ?? (this.risquesDisponibles[0] as any).id;

    const newAction: ActionRisque = {
      risque: { idRisque: firstRisqueId },
      descriptionAction: '',
      responsable: '',
      delai: '',
      statut: 'Non commencée'
    };

    this.actionService.create(newAction).subscribe({
      next: (saved: any) => {
        const normalizedSaved: ActionRisque = {
          ...saved,
          idAction: saved.idAction ?? saved.id,
          risque: typeof saved.risque === 'object' && saved.risque !== null
            ? { ...saved.risque, idRisque: saved.risque.idRisque ?? saved.risque.id }
            : { idRisque: saved.risque }
        };
        this.actionsList.push(normalizedSaved);
      },
      error: (err: HttpErrorResponse) => console.error('Erreur création action :', err)
    });
  }

  saveAction(action: ActionRisque): void {
    const idToUpdate = action.idAction ?? (action as any).id;
    if (idToUpdate) {
      this.actionService.update(idToUpdate, action).subscribe({
        error: (err: HttpErrorResponse) => console.error('Erreur mise à jour action :', err)
      });
    }
  }

 removeAction(action: ActionRisque): void {
  const idToDelete = action.idAction ?? (action as any).id;

  // Sécurité si l'action n'a pas encore d'ID en BDD
  if (!idToDelete) {
    this.actionsList = this.actionsList.filter(a => a !== action);
    return;
  }

  this.actionService.delete(idToDelete).subscribe({
    next: () => {
      this.actionsList = this.actionsList.filter(a => (a.idAction ?? (a as any).id) !== idToDelete);
    },
    error: (err: HttpErrorResponse) => console.error('Erreur suppression action :', err)
  });
}

  onRisqueChange(action: ActionRisque, idRisque: string): void {
    action.risque = { idRisque: Number(idRisque) };
    this.saveAction(action);
  }

  getRisqueId(action: ActionRisque): number | undefined {
    if (!action.risque) return undefined;
    return (action.risque as any).idRisque ?? (action.risque as any).id;
  }

  labelRisque(risque: Risque): string {
    return `${risque.code} : ${risque.description}`;
  }

  // Fonction de tracking sécurisée contre les clés undefined
  trackById(index: number, item: any): number {
    return item?.idAction ?? item?.idRisque ?? item?.id ?? index;
  }
  
}