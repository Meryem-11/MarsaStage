import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RisqueService } from './risque.service';
import { Risque } from './risque.model';
import { ProcessusService } from '../../processus/processus.service';
import { Processus } from '../../processus/processus-liste';

@Component({
  selector: 'app-analyse-risques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analyse-des-risques.html',
  styleUrl: './analyse-des-risques.css'
})
export class AnalyseRisques implements OnInit {

  processusDisponibles: Processus[] = [];
  risquesList: Risque[] = [];

  isModalOpen = false;
  isEditMode = false;
  currentRisque: Risque = this.getEmptyRisque();

  constructor(
    private risqueService: RisqueService,
    private processusService: ProcessusService
  ) {}

  ngOnInit(): void {
    this.loadProcessus();
    this.loadRisques();
  }

  loadProcessus(): void {
    this.processusService.getAll().subscribe({
      next: (data: Processus[]) => {
        this.processusDisponibles = data;
      },
      error: (err: HttpErrorResponse) => console.error('Erreur chargement processus :', err)
    });
  }

  loadRisques(): void {
    this.risqueService.getAll().subscribe({
      next: (data: Risque[]) => {
        this.risquesList = data;
      },
      error: (err: HttpErrorResponse) => console.error('Erreur chargement risques :', err)
    });
  }

 getEmptyRisque(): Risque {
  const premierProcessusId = this.processusDisponibles[0]?.id ?? 0;

  return {
    processus: { id: premierProcessusId },
    code: '',
    description: '',
    cause: '',
    probabilite: 1,
    gravite: 1,
    criticite: 1,
    mesurePrevention: ''
  };
}

  openAddModal(): void {
    if (this.processusDisponibles.length === 0) {
      alert("Aucun processus disponible. Créez d'abord un processus.");
      return;
    }
    this.isEditMode = false;
    this.currentRisque = this.getEmptyRisque();
    this.isModalOpen = true;
  }

  openEditModal(risque: Risque): void {
    this.isEditMode = true;
    // Copie profonde de l'objet pour éviter d'impacter le tableau avant validation
    this.currentRisque = {
      ...risque,
      processus: risque.processus ? { ...risque.processus } : { id: 0 }
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveRisqueModal(): void {
    if (!this.currentRisque.description?.trim()) {
      alert('La description du risque est obligatoire !');
      return;
    }

    // Conversion explicite en Number (au cas où les selects envoient des strings)
    const proba = Number(this.currentRisque.probabilite);
    const grav = Number(this.currentRisque.gravite);
    
    this.currentRisque.probabilite = proba;
    this.currentRisque.gravite = grav;
    this.currentRisque.criticite = proba * grav;

    // S'assurer que le processus sélectionné a bien un ID numérique
    if (this.currentRisque.processus) {
      this.currentRisque.processus.id = Number(this.currentRisque.processus.id);
    }

    if (this.isEditMode && this.currentRisque.idRisque) {
      // Modification
      this.risqueService.update(this.currentRisque.idRisque, this.currentRisque).subscribe({
        next: () => {
          this.loadRisques(); // Rechargement propre depuis la BDD
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour :', err);
          alert('Erreur lors de la mise à jour du risque.');
        }
      });
    } else {
      // Ajout / Création
      this.risqueService.create(this.currentRisque).subscribe({
        next: () => {
          this.loadRisques(); // Synchronise la BDD avec le Front
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors de la création :', err);
          alert('Erreur lors de la sauvegarde dans la base de données.');
        }
      });
    }
  }

  removeRisque(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce risque ?')) {
      this.risqueService.delete(id).subscribe({
        next: () => {
          this.risquesList = this.risquesList.filter(r => r.idRisque !== id);
        },
        error: (err: HttpErrorResponse) => console.error('Erreur suppression risque :', err)
      });
    }
  }

  niveauRisque(risque: Risque): string {
    const crit = risque.criticite || (risque.probabilite * risque.gravite);
    if (crit >= 12) return 'Critique';
    if (crit >= 8) return 'Élevé';
    if (crit >= 4) return 'Moyen';
    return 'Faible';
  }

  getProcessusLabel(risque: Risque): string {
    if (!risque.processus) return '-';
    const proc = this.processusDisponibles.find(p => p.id === risque.processus.id);
    return proc ? `${proc.code || ''} ${proc.nom || ''}`.trim() : `Proc. #${risque.processus.id}`;
  }
}