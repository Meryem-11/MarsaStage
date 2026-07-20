import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TypeDocument = 'Procédure' | 'Manuel' | 'Politique' | 'Enregistrement' | 'Formulaire';
type StatutDocument = 'En vigueur' | 'En révision' | 'Brouillon' | 'Obsolète';

interface DocumentQSSE {
  id: number;
  code: string;
  titre: string;
  type: TypeDocument;
  version: string;
  dateCreation: string;
  dateRevision: string;
  statut: StatutDocument;
  responsable: string;
  fichierNom?: string;
  fichierUrl?: string;
  fichierTaille?: string;
}

@Component({
  selector: 'app-liste-documents',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste-docs.html',
  styleUrl: './liste-docs.css'
})
export class ListeDocuments {

  typesDisponibles: TypeDocument[] = ['Procédure', 'Manuel', 'Politique', 'Enregistrement', 'Formulaire'];

  responsablesDisponibles: string[] = [
    'Responsable QSSE',
    'Responsable HSE',
    'Chef Exploitation',
    'Directeur Port'
  ];

  documents: DocumentQSSE[] = [
    {
      id: 1,
      code: 'PROC-QSSE-014',
      titre: 'Procédure de gestion des situations d\'urgence portuaire',
      type: 'Procédure',
      version: 'v2.1',
      dateCreation: '2024-03-10',
      dateRevision: '2026-05-02',
      statut: 'En vigueur',
      responsable: 'Responsable HSE'
    },
    {
      id: 2,
      code: 'MAN-QSSE-002',
      titre: 'Manuel du système de management intégré',
      type: 'Manuel',
      version: 'v3.0',
      dateCreation: '2023-01-15',
      dateRevision: '2026-01-20',
      statut: 'En révision',
      responsable: 'Responsable QSSE'
    },
    {
      id: 3,
      code: 'FORM-EXP-021',
      titre: 'Formulaire de déclaration d\'incident',
      type: 'Formulaire',
      version: 'v1.3',
      dateCreation: '2025-06-01',
      dateRevision: '2025-06-01',
      statut: 'Obsolète',
      responsable: 'Chef Exploitation'
    }
  ];

  private generateId(): number {
    return this.documents.length > 0 ? Math.max(...this.documents.map(d => d.id)) + 1 : 1;
  }

  addDocument(): void {
    const num = this.documents.length + 1;
    this.documents.unshift({
      id: this.generateId(),
      code: `DOC-${String(num).padStart(3, '0')}`,
      titre: '',
      type: 'Procédure',
      version: 'v1.0',
      dateCreation: new Date().toISOString().split('T')[0],
      dateRevision: '',
      statut: 'Brouillon',
      responsable: ''
    });
  }

  removeDocument(id: number): void {
    const doc = this.documents.find(d => d.id === id);
    if (doc?.fichierUrl) {
      URL.revokeObjectURL(doc.fichierUrl);
    }
    this.documents = this.documents.filter(d => d.id !== id);
  }

  onFileSelected(event: Event, doc: DocumentQSSE): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      if (doc.fichierUrl) {
        URL.revokeObjectURL(doc.fichierUrl);
      }

      doc.fichierNom = file.name;
      doc.fichierUrl = URL.createObjectURL(file);
      doc.fichierTaille = this.formatTaille(file.size);
    }
  }

  downloadDocument(doc: DocumentQSSE): void {
    if (!doc.fichierUrl) return;
    const link = document.createElement('a');
    link.href = doc.fichierUrl;
    link.download = doc.fichierNom ?? doc.code;
    link.click();
  }

  private formatTaille(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }

  get totalDocuments(): number {
    return this.documents.length;
  }

  get documentsEnVigueur(): number {
    return this.documents.filter(d => d.statut === 'En vigueur').length;
  }

  get documentsEnRevision(): number {
    return this.documents.filter(d => d.statut === 'En révision').length;
  }

  get documentsObsoletes(): number {
    return this.documents.filter(d => d.statut === 'Obsolète').length;
  }
}