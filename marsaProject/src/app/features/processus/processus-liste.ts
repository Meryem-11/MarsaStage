import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcessusService } from './processus.service';

export interface Processus {
  id?: number;
  code: string;
  nom: string;
  description: string;
  type: 'PILOTAGE' | 'REALISATION' | 'SUPPORT';
  pilote: string;
  version: string;
  dateRevision: string;
  statut: 'A_JOUR' | 'EN_REVISION';
  nomPdf?: string;
  cheminPdf?: string;
}

@Component({
  selector: 'app-processus-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './processus-liste.html',
  styleUrl: './processus-liste.css'
})
export class ProcessusListe implements OnInit {

  // La liste part vide, elle est remplie depuis la BDD via loadProcessus()
  processusList: Processus[] = [];

  // Gestion de la Modal d'Ajout/Modification
  isModalOpen = false;
  isEditMode = false;

  // Gestion du menu déroulant d'actions
  openDropdownCode: string | null = null;

  // Objet de formulaire lié avec ngModel
  currentProcessus: Processus = this.getEmptyProcessus();

  constructor(private processusService: ProcessusService) {}

  ngOnInit(): void {
    this.loadProcessus();
  }

  loadProcessus() {
    this.processusService.getAll().subscribe({
      next: (data) => this.processusList = data,
      error: (err) => console.error('Erreur lors du chargement des processus :', err)
    });
  }

  toggleDropdown(code: string, event: Event) {
    event.stopPropagation();
    this.openDropdownCode = this.openDropdownCode === code ? null : code;
  }

  closeDropdown() {
    this.openDropdownCode = null;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeDropdown();
  }

  deleteProcessus(proc: Processus) {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer le processus "${proc.nom}" ?`);
    if (confirmDelete && proc.id !== undefined) {
      this.processusService.delete(proc.id).subscribe({
        next: () => this.loadProcessus(),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
    this.closeDropdown();
  }

  getEmptyProcessus(): Processus {
    return {
      code: '',
      nom: '',
      description: '',
      type: 'REALISATION',
      pilote: '',
      version: '1.0',
      dateRevision: new Date().toISOString().split('T')[0],
      statut: 'A_JOUR',
      nomPdf: '',
      cheminPdf: ''
    };
  }

 openAddModal(): void {
  this.isEditMode = false;
  this.currentProcessus = this.getEmptyProcessus();
  this.isModalOpen = true;
}

  openEditModal(proc: Processus) {
    this.isEditMode = true;
    // On effectue une copie pour éviter de modifier directement dans le tableau avant validation
    this.currentProcessus = { ...proc };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

 saveProcessus(): void {
  // 1. Vérification des champs requis
  if (!this.currentProcessus.code?.trim() || !this.currentProcessus.nom?.trim()) {
    alert('Le code et le nom du processus sont obligatoires !');
    return;
  }

  // 2. Traitement d'enregistrement
  if (this.isEditMode) {
    this.processusService.updateProcessus(this.currentProcessus.code, this.currentProcessus)
      .subscribe({
        next: (res) => {
          this.loadProcessus();
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
  } else {
    this.processusService.createProcessus(this.currentProcessus)
      .subscribe({
        next: (res) => {
          this.loadProcessus();
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
  }
}

  // Simulation de l'Upload PDF
onFileSelected(event: Event, proc: Processus) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && file.type === 'application/pdf') {
    this.processusService.uploadPdf(proc.code, file).subscribe({
      next: (updated: Processus) => this.loadProcessus(),
      error: (err: unknown) => console.error('Erreur upload PDF', err)
    });
  } else {
    alert('Veuillez sélectionner un fichier au format PDF uniquement.');
  }
}

  triggerFileInput(fileInputId: string) {
    const fileInput = document.getElementById(fileInputId) as HTMLElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  downloadPdf(proc: Processus) {
    if (proc.cheminPdf) {
      const link = document.createElement('a');
      link.href = proc.cheminPdf;
      link.download = proc.nomPdf || "processus.pdf";
      link.click();
    }
  }
}