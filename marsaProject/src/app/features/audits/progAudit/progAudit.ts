import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ProgrammeAudit,
  Audit,
  ProgrammeAuditService
} from '../services/programme-audit';

@Component({
  selector: 'app-prog-audit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './progAudit.html',
  styleUrl: './progAudit.css'
})
export class ProgAudit implements OnInit {

  constructor(
    private programmeService: ProgrammeAuditService
  ) {}

  /******************************
   * LISTES
   ******************************/

  programmes: ProgrammeAudit[] = [];

  programmesFiltres: ProgrammeAudit[] = [];

  terminaux: string[] = [
    'Terminal Conteneurs',
    'Terminal Polyvalent',
    'Terminal Céréalier',
    'Terminal Hydrocarbures',
    'Terminal Passagers'
  ];

  typesAudit: string[] = [
    'Interne',
    'Externe'
  ];

  statutsAudit: string[] = [
    'Planifié',
    'En cours',
    'Réalisé',
    'Reporté'
  ];

  /******************************
   * FILTRES
   ******************************/

  recherche = '';

  filtreAnnee = '';

  filtreResponsable = '';

  /******************************
   * STATISTIQUES
   ******************************/

  totalProgrammes = 0;

  totalAudits = 0;

  auditsPlanifies = 0;

  auditsRealises = 0;

  auditsEnCours = 0;

  auditsReportes = 0;

  /******************************
   * FORMULAIRE
   ******************************/

  programme: ProgrammeAudit = {
    reference: '',
    annee: '',
    responsable: '',
    dateCreation: '',
    audits: []
  };

  /******************************
   * INITIALISATION
   ******************************/

  ngOnInit(): void {

    this.resetForm();

    this.loadProgrammes();

  }

  /******************************
   * CHARGEMENT
   ******************************/

  loadProgrammes(): void {

    this.programmeService.getProgrammes().subscribe({

      next: (data) => {

        this.programmes = data;

        this.programmesFiltres = [...data];

        this.updateStatistics();

      },

      error: (err) => {

        console.error(
          'Erreur chargement des programmes :',
          err
        );

      }

    });

  }

  /******************************
   * STATISTIQUES
   ******************************/

  updateStatistics(): void {

    this.totalProgrammes = this.programmes.length;

    this.totalAudits = 0;

    this.auditsPlanifies = 0;

    this.auditsEnCours = 0;

    this.auditsRealises = 0;

    this.auditsReportes = 0;

    this.programmes.forEach(programme => {

      this.totalAudits += programme.audits.length;

      programme.audits.forEach(audit => {

        switch (audit.statut) {

          case 'Planifié':
            this.auditsPlanifies++;
            break;

          case 'En cours':
            this.auditsEnCours++;
            break;

          case 'Réalisé':
            this.auditsRealises++;
            break;

          case 'Reporté':
            this.auditsReportes++;
            break;

        }

      });

    });

  }

  /******************************
   * FILTRES
   ******************************/

  applyFilters(): void {

    this.programmesFiltres = this.programmes.filter(programme => {

      const okRecherche =
        this.recherche === '' ||

        programme.reference
          .toLowerCase()
          .includes(this.recherche.toLowerCase()) ||

        programme.responsable
          .toLowerCase()
          .includes(this.recherche.toLowerCase());

      const okAnnee =
        this.filtreAnnee === '' ||
        programme.annee === this.filtreAnnee;

      const okResponsable =
        this.filtreResponsable === '' ||

        programme.responsable
          .toLowerCase()
          .includes(this.filtreResponsable.toLowerCase());

      return (
        okRecherche &&
        okAnnee &&
        okResponsable
      );

    });

  }
    /******************************
   * AJOUT D'UN AUDIT
   ******************************/

  addAudit(): void {

    const nouvelAudit: Audit = {

      reference: '',

      titre: '',

      type: 'Interne',

      terminal: this.terminaux[0],

      auditeur: '',

      dateDebut: '',

      dateFin: '',

      statut: 'Planifié'

    };

    this.programme.audits.push(nouvelAudit);

  }

  /******************************
   * SUPPRESSION D'UN AUDIT
   ******************************/

  removeAudit(index: number): void {

    if (index < 0 || index >= this.programme.audits.length) {
      return;
    }

    this.programme.audits.splice(index, 1);

  }

  /******************************
   * ENREGISTREMENT
   ******************************/

  saveProgramme(): void {

    if (
      this.programme.reference.trim() === '' ||
      this.programme.annee.trim() === '' ||
      this.programme.responsable.trim() === ''
    ) {

      alert('Veuillez compléter les informations du programme.');

      return;

    }

    if (this.programme.audits.length === 0) {

      alert('Veuillez ajouter au moins un audit.');

      return;

    }

    for (const audit of this.programme.audits) {

      if (
        audit.reference.trim() === '' ||
        audit.titre.trim() === '' ||
        audit.auditeur.trim() === ''
      ) {

        alert('Chaque audit doit être complètement renseigné.');

        return;

      }

      if (!audit.dateDebut || !audit.dateFin) {

        alert('Veuillez renseigner les dates de tous les audits.');

        return;

      }

    }

    const programmeAEnvoyer: ProgrammeAudit = {

      reference: this.programme.reference,

      annee: this.programme.annee,

      responsable: this.programme.responsable,

      dateCreation: this.programme.dateCreation,

      audits: this.programme.audits.map(audit => ({

        reference: audit.reference,

        titre: audit.titre,

        type: audit.type,

        terminal: audit.terminal,

        auditeur: audit.auditeur,

        dateDebut: audit.dateDebut,

        dateFin: audit.dateFin,

        statut: audit.statut

      }))

    };

    this.programmeService.createProgramme(programmeAEnvoyer)
      .subscribe({

        next: (programmeSauvegarde) => {

          console.log(
            'Programme enregistré :',
            programmeSauvegarde
          );
                    alert('Programme enregistré avec succès.');

          this.resetForm();

          this.loadProgrammes();

        },

        error: (err) => {

          console.error(
            'Erreur lors de l\'enregistrement :',
            err
          );

          alert("Impossible d'enregistrer le programme.");

        }

      });

  }

  /******************************
   * RÉINITIALISATION DU FORMULAIRE
   ******************************/

  resetForm(): void {

    this.programme = {

      reference: '',

      annee: String(new Date().getFullYear()),

      responsable: '',

      dateCreation: new Date()
        .toISOString()
        .substring(0, 10),

      audits: []

    };

  }

  /******************************
   * SUPPRESSION D'UN PROGRAMME
   ******************************/

  deleteProgramme(id?: number): void {

    if (id === undefined) {
      return;
    }

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce programme ?'
    );

    if (!confirmation) {
      return;
    }

    this.programmeService.deleteProgramme(id)
      .subscribe({

        next: () => {

          this.loadProgrammes();

        },

        error: (err) => {

          console.error(
            'Erreur suppression :',
            err
          );

          alert('La suppression a échoué.');

        }

      });

  }

  /******************************
   * RECHARGEMENT
   ******************************/

  refresh(): void {

    this.loadProgrammes();

  }

  /******************************
   * NOMBRE D'AUDITS
   ******************************/

  getNombreAudits(programme: ProgrammeAudit): number {

    return programme.audits.length;

  }

  /******************************
   * AUDITS RÉALISÉS
   ******************************/

  getAuditsRealises(programme: ProgrammeAudit): number {

    return programme.audits.filter(
      audit => audit.statut === 'Réalisé'
    ).length;

  }
    /******************************
   * AUDITS PLANIFIÉS
   ******************************/

  getAuditsPlanifies(programme: ProgrammeAudit): number {

    return programme.audits.filter(
      audit => audit.statut === 'Planifié'
    ).length;

  }

  /******************************
   * AUDITS EN COURS
   ******************************/

  getAuditsEnCours(programme: ProgrammeAudit): number {

    return programme.audits.filter(
      audit => audit.statut === 'En cours'
    ).length;

  }

  /******************************
   * AUDITS REPORTÉS
   ******************************/

  getAuditsReportes(programme: ProgrammeAudit): number {

    return programme.audits.filter(
      audit => audit.statut === 'Reporté'
    ).length;

  }

  /******************************
   * POURCENTAGE D'AUDITS RÉALISÉS
   ******************************/

  getProgression(programme: ProgrammeAudit): number {

    if (programme.audits.length === 0) {
      return 0;
    }

    return Math.round(
      (
        this.getAuditsRealises(programme)
        / programme.audits.length
      ) * 100
    );

  }

  /******************************
   * TRI PAR RÉFÉRENCE
   ******************************/

  sortByReference(): void {

    this.programmesFiltres.sort((a, b) =>
      a.reference.localeCompare(b.reference)
    );

  }

  /******************************
   * TRI PAR ANNÉE
   ******************************/

  sortByAnnee(): void {

    this.programmesFiltres.sort((a, b) =>
      b.annee.localeCompare(a.annee)
    );

  }

  /******************************
   * TRI PAR RESPONSABLE
   ******************************/

  sortByResponsable(): void {

    this.programmesFiltres.sort((a, b) =>
      a.responsable.localeCompare(b.responsable)
    );

  }

  /******************************
   * RÉINITIALISER LES FILTRES
   ******************************/

  clearFilters(): void {

    this.recherche = '';

    this.filtreAnnee = '';

    this.filtreResponsable = '';

    this.programmesFiltres = [...this.programmes];

  }

}