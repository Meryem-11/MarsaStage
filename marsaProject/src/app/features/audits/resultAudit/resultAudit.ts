import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ProgrammeAudit,
  ProgrammeAuditService,
  Audit

} from '../services/programme-audit';

import {
  ResultatAudit,
  ResultatAuditService
} from '../services/resultat-audit';

type Categorie =
  | 'Non-conformité majeure'
  | 'Non-conformité mineure'
  | 'Recommandation'
  | 'Point fort';

type StatutConstat =
  | 'Ouvert'
  | 'En traitement'
  | 'Clôturé';

interface Constat {

  id?: number;

  categorie: Categorie;

  description: string;

  exigence: string;

  responsable: string;

  echeance: string;

  statut: StatutConstat;

}

@Component({
  selector: 'app-result-audit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './resultAudit.html',
  styleUrl: './resultAudit.css'
})
export class ResultAudit implements OnInit {

  constructor(

    private programmeService: ProgrammeAuditService,
    private resultatService: ResultatAuditService,
    private router:Router

  ) {}

  /**********************************
   * AUDITS
   **********************************/

  programmes: ProgrammeAudit[] = [];
  resultats: ResultatAudit[] = [];

  auditsDisponibles: Audit[] = [];

  auditSelectionne?: Audit;

  programmeSelectionne?: ProgrammeAudit;

  auditSelectionneId?: number;

  /**********************************
   * RESULTAT
   **********************************/

  conclusion = '';

  categories: Categorie[] = [

    'Non-conformité majeure',

    'Non-conformité mineure',

    'Recommandation',

    'Point fort'

  ];

  constats: Constat[] = [];

  ngOnInit(): void {

    this.loadAudits();
    this.loadResultats();

  }

  /**********************************
   * CHARGER LES AUDITS
   **********************************/
loadResultats(): void {

  this.resultatService.getResultats()
    .subscribe({

      next: (data) => {

        this.resultats = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

}
  loadAudits(): void {

    this.programmeService
      .getProgrammes()
      .subscribe({

        next: (programmes: ProgrammeAudit[]) => {

          this.programmes = programmes;

          this.auditsDisponibles = [];

          programmes.forEach(

            (programme: ProgrammeAudit) => {

              programme.audits.forEach(

                (audit: Audit) => {

                  this.auditsDisponibles.push(audit);

                }

              );

            }

          );

        },

        error: (err: unknown) => {

          console.error(err);

          alert(

            "Impossible de charger les audits."

          );

        }

      });

  }

  /**********************************
   * AUDIT SELECTIONNE
   **********************************/

  onAuditChange(): void {

    this.auditSelectionne =

      this.auditsDisponibles.find(

        (a: Audit) =>

          a.id === this.auditSelectionneId

      );

    if (!this.auditSelectionne) {

      this.programmeSelectionne = undefined;

      return;

    }

    this.programmeSelectionne =

      this.programmes.find(

        (programme: ProgrammeAudit) =>

          programme.audits.some(

            (audit: Audit) =>

              audit.id === this.auditSelectionne!.id

          )

      );

  }
    /**********************************
   * ID UNIQUE
   **********************************/

  private generateId(): string {

    return Math.random()

      .toString(36)

      .substring(2, 10);

  }

  /**********************************
   * CONSTATS
   **********************************/

  addConstat(): void {

    this.constats.push({


      categorie: 'Recommandation',

      description: '',

      exigence: '',

      responsable: '',

      echeance: '',

      statut: 'Ouvert'

    });

  }


  removeConstat(index: number): void {
  this.constats.splice(index, 1);
}


  /**********************************
   * SCORE GLOBAL
   **********************************/

  get scoreGlobal(): number {

    let score = 100;

    this.constats.forEach(

      (c: Constat) => {

        switch (c.categorie) {

          case 'Non-conformité majeure':

            score -= 20;

            break;

          case 'Non-conformité mineure':

            score -= 8;

            break;

          case 'Recommandation':

            score -= 2;

            break;

          case 'Point fort':

            score += 5;

            break;

        }

      }

    );

    if (score < 0) {

      score = 0;

    }

    if (score > 100) {

      score = 100;

    }

    return score;

  }


  get scoreColor(): string {

    if (this.scoreGlobal >= 80) {

      return '#22c55e';

    }

    if (this.scoreGlobal >= 60) {

      return '#f59e0b';

    }

    return '#ef4444';

  }


  get scoreLabel(): string {

    if (this.scoreGlobal >= 80) {

      return 'Conforme';

    }

    if (this.scoreGlobal >= 60) {

      return 'Conforme avec réserves';

    }

    return 'Non conforme';

  }


  get scoreClass(): string {

    if (this.scoreGlobal >= 80) {

      return 'label-good';

    }

    if (this.scoreGlobal >= 60) {

      return 'label-warning';

    }

    return 'label-danger';

  }


  /**********************************
 * SAUVEGARDE
 **********************************/

saveResultatAudit(): void {

  if (!this.auditSelectionne) {

    alert("Veuillez sélectionner un audit.");

    return;

  }

  const resultat: ResultatAudit = {

    score: this.scoreGlobal,

    conclusion: this.conclusion,

    audit: this.auditSelectionne,

    constats: this.constats

  };


  this.resultatService
    .createResultat(resultat)
    .subscribe({

      next: (res: ResultatAudit) => {

        alert("Résultat enregistré avec succès.");

        this.loadResultats();

      },

      error: (err: unknown) => {

        console.error(err);

        alert("Erreur lors de l'enregistrement.");

      }

    });

}

}

