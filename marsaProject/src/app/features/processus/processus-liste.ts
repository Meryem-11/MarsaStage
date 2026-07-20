import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  HostListener } from '@angular/core';
interface Processus {
  code: string;
  name: string;
  description: string;
  type: 'Pilotage' | 'Réalisation' | 'Support';
  owner: string;
  version: string;
  lastRevision: string;
  status: 'À jour' | 'En révision';
  pdfName?: string; // Nom du fichier PDF rattaché
  pdfUrl?: string;  // Lien de téléchargement
}

@Component({
  selector: 'app-processus-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './processus-liste.html',
  styleUrl: './processus-liste.css'
})
export class ProcessusListe {
  processusList: Processus[] = [
    {
      code: 'PR-MNG-01',
      name: 'Management Stratégique & SMI',
      description: 'Pilotage des objectifs globaux, revues de direction et conformité du SMI.',
      type: 'Pilotage',
      owner: 'Direction Générale / Responsable SMI',
      version: '3.0',
      lastRevision: '14/05/2026',
      status: 'À jour',
      pdfName: 'fiche_management_smi.pdf',
      pdfUrl: '#'
    },
    {
      code: 'PR-OPS-01',
      name: 'Services aux Navires',
      description: 'Pilotage de l’accostage, du remorquage, du lamanage et de l’avitaillement.',
      type: 'Réalisation',
      owner: 'Directeur des Opérations Portuaires',
      version: '4.2',
      lastRevision: '10/02/2026',
      status: 'À jour'
    },
    {
      code: 'PR-OPS-02',
      name: 'Manutention & Stockage des Marchandises',
      description: 'Opérations de chargement/déchargement des conteneurs, vrac et marchandises diverses.',
      type: 'Réalisation',
      owner: 'Chef de Terminal',
      version: '5.0',
      lastRevision: '22/06/2026',
      status: 'En révision'
    }
  ];

  // Gestion de la Modal d'Ajout/Modification
  isModalOpen = false;
  isEditMode = false;
// Gestion du menu déroulant d'actions
  openDropdownCode: string | null = null;

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
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer le processus "${proc.name}" ?`);
    if (confirmDelete) {
      this.processusList = this.processusList.filter(p => p.code !== proc.code);
    }
    this.closeDropdown();
  }
  // Objet de formulaire lié avec ngModel
  currentProcessus: Processus = this.getEmptyProcessus();

  getEmptyProcessus(): Processus {
    return {
      code: '',
      name: '',
      description: '',
      type: 'Réalisation',
      owner: '',
      version: '1.0',
      lastRevision: new Date().toLocaleDateString('fr-FR'),
      status: 'À jour'
    };
  }

  openAddModal() {
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

  saveProcessus() {
    if (!this.currentProcessus.code || !this.currentProcessus.name) {
      alert('Veuillez remplir au moins le code et le nom du processus.');
      return;
    }

    if (this.isEditMode) {
      // Mode Édition
      const index = this.processusList.findIndex(p => p.code === this.currentProcessus.code);
      if (index !== -1) {
        this.processusList[index] = { ...this.currentProcessus };
      }
    } else {
      // Mode Création
      // Vérification d'unicité du code
      const exists = this.processusList.some(p => p.code === this.currentProcessus.code);
      if (exists) {
        alert('Un processus avec ce code existe déjà !');
        return;
      }
      this.processusList.push({ ...this.currentProcessus });
    }

    this.closeModal();
  }

  // Simulation de l'Upload PDF
  onFileSelected(event: any, proc: Processus) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      proc.pdfName = file.name;
      // Création d'un lien local temporaire pour le téléchargement
      proc.pdfUrl = URL.createObjectURL(file);
    } else {
      alert('Veuillez sélectionner un fichier au format PDF uniquement.');
    }
  }

  // Déclenche le clic sur l'input file caché d'une ligne
  triggerFileInput(fileInputId: string) {
    const fileInput = document.getElementById(fileInputId) as HTMLElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Téléchargement du PDF
  downloadPdf(proc: Processus) {
    if (proc.pdfUrl) {
      const link = document.createElement('a');
      link.href = proc.pdfUrl;
      link.download = proc.pdfName || 'processus.pdf';
      link.click();
    }
  }
}
