import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PpService, PartiePrenanteBackend } from './pp.service';

interface PartiePrenante {
  id?: number;
  role: string;
  nom: string;
  type: string;
  influence: string;
  interet: string;
  attentes: string;
  risque: string;
  action: string;
}

const EMPTY_FORM: PartiePrenante = {
  nom: '',
  role: '',
  type: 'Interne',
  influence: 'Faible',
  interet: 'Faible',
  attentes: '',
  risque: '',
  action: ''
};

@Component({
  selector: 'app-pp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pp.html',
  styleUrl: './pp.css'
})
export class Pp implements OnInit {
  private ppService = inject(PpService);

  parties: PartiePrenante[] = [];

  // État du formulaire modal
  showForm = false;
  isEditMode = false;
  formData: PartiePrenante = { ...EMPTY_FORM };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ppService.getAll().subscribe({
      next: (data) => { this.parties = data; },
      error: (err) => console.error('Erreur lors du chargement des parties prenantes :', err)
    });
  }

  // Ouvre le formulaire vide pour ajout
  openAddForm(): void {
    this.isEditMode = false;
    this.formData = { ...EMPTY_FORM };
    this.showForm = true;
  }

  // Ouvre le formulaire pré-rempli pour modification
  openEditForm(partie: PartiePrenante): void {
    this.isEditMode = true;
    this.formData = { ...partie };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  // Sauvegarde (création ou mise à jour) depuis le formulaire
  saveForm(): void {
    if (!this.formData.nom.trim()) return;

    const payload: PartiePrenanteBackend = {
      nom: this.formData.nom,
      role: this.formData.role,
      type: this.formData.type,
      influence: this.formData.influence,
      interet: this.formData.interet,
      attentes: this.formData.attentes,
      risque: this.formData.risque,
      action: this.formData.action
    };

    if (this.isEditMode && this.formData.id) {
      this.ppService.update(this.formData.id, payload).subscribe({
        next: (updated) => {
          const index = this.parties.findIndex(p => p.id === updated.id);
          if (index !== -1) this.parties[index] = updated;
          this.closeForm();
        },
        error: (err) => console.error('Erreur lors de la mise à jour :', err)
      });
    } else {
      this.ppService.create(payload).subscribe({
        next: (created) => {
          this.parties.push(created);
          this.closeForm();
        },
        error: (err) => console.error('Erreur lors de la création :', err)
      });
    }
  }

  removePartie(partie: PartiePrenante): void {
    if (!partie.id) return;
    if (!confirm(`Supprimer "${partie.nom}" ?`)) return;

    this.ppService.delete(partie.id).subscribe({
      next: () => {
        this.parties = this.parties.filter(p => p.id !== partie.id);
      },
      error: (err) => console.error('Erreur de suppression :', err)
    });
  }

  getBadgeClass(value: string): string {
    switch (value) {
      case 'Élevée':
      case 'Élevé':
        return 'badge-high';
      case 'Moyenne':
      case 'Moyen':
        return 'badge-medium';
      default:
        return 'badge-low';
    }
  }
}