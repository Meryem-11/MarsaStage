import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RisqueService } from './risque.service';
import { Risque } from './risque.model';
import { ProcessusService} from '../../processus/processus.service'; 
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

  constructor(
    private risqueService: RisqueService,
    private processusService: ProcessusService
  ) {}

  ngOnInit(): void {
    this.processusService.getAll().subscribe({
      next: (data: Processus[]) => this.processusDisponibles = data,
      error: (err: HttpErrorResponse) => console.error('Erreur chargement processus :', err)
    });

    this.risqueService.getAll().subscribe({
      next: (data: Risque[]) => this.risquesList = data,
      error: (err: HttpErrorResponse) => console.error('Erreur chargement risques :', err)
    });
  }

  // Création immédiate en base pour obtenir l'idRisque
  addRisqueLine(): void {
    if (this.processusDisponibles.length === 0) {
      console.error('Aucun processus disponible pour créer un risque.');
      return;
    }

    const newRisque: Risque = {
      processus: { id: this.processusDisponibles[0].id! },
      code: '',
      description: '',
      cause: '',
      probabilite: 1,
      gravite: 1,
      criticite: 1,
      mesurePrevention: ''
    };

    this.risqueService.create(newRisque).subscribe({
      next: (saved: Risque) => this.risquesList.push(saved),
      error: (err: HttpErrorResponse) => console.error('Erreur création risque :', err)
    });
  }

  // Sauvegarde à chaque modification (blur / change)
  saveRisque(risque: Risque): void {
    if (risque.idRisque) {
      this.risqueService.update(risque.idRisque, risque).subscribe({
        error: (err: HttpErrorResponse) => console.error('Erreur mise à jour risque :', err)
      });
    }
  }

  removeRisque(id: number): void {
    this.risqueService.delete(id).subscribe({
      next: () => this.risquesList = this.risquesList.filter(r => r.idRisque !== id),
      error: (err: HttpErrorResponse) => console.error('Erreur suppression risque :', err)
    });
  }

  // Recalcule la criticité puis sauvegarde
  updateCriticite(risque: Risque): void {
    risque.criticite = risque.probabilite * risque.gravite;
    this.saveRisque(risque);
  }

  // Sélection du processus (objet -> id) puis sauvegarde
  onProcessusChange(risque: Risque, processusId: string): void {
    risque.processus = { id: Number(processusId) };
    this.saveRisque(risque);
  }

  // Niveau calculé côté front, non stocké en base
  niveauRisque(risque: Risque): string {
    if (risque.criticite >= 12) return 'Critique';
    if (risque.criticite >= 8) return 'Élevé';
    if (risque.criticite >= 4) return 'Moyen';
    return 'Faible';
  }

  // Récupère l'id du processus déjà sélectionné pour le select
  getProcessusId(risque: Risque): number | undefined {
    return (risque.processus as any)?.id;
  }
}