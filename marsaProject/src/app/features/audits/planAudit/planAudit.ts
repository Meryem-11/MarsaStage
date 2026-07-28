import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ProgrammeAudit,
  ProgrammeAuditService,
  Audit
} from '../services/programme-audit';
import {
  PlanAuditService,
  PlanAuditModel,
  EquipeAudit,
  PlanningAudit
} from '../services/plan-audit';

interface EquipeMembre {

  id: string;

  nom: string;

  role: string;

}

interface PlanningActivite {

  id: string;

  jour: string;

  horaire: string;

  activite: string;

}

@Component({
  selector: 'app-plan-audit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './planAudit.html',
  styleUrl: './planAudit.css'
})
export class PlanAudit implements OnInit {

  constructor(

    private programmeService: ProgrammeAuditService,
    private planAuditService: PlanAuditService

  ) {}

  /*****************************
   * DONNEES
   *****************************/

  programmes: ProgrammeAudit[] = [];

  auditsDisponibles: Audit[] = [];

  auditSelectionne?: Audit;

  programmeSelectionne?: ProgrammeAudit;

  auditSelectionneId?: number;

  /*****************************
   * PLAN
   *****************************/

  objectifs = '';

  perimetre = '';

  criteres = '';

  /*****************************
   * EQUIPE
   *****************************/

  equipe: EquipeMembre[] = [

    {

      id: this.generateId(),

      nom: '',

      role: 'Auditeur principal'

    }

  ];

  rolesDisponibles = [

    'Auditeur principal',

    'Auditeur',

    'Observateur',

    'Expert technique'

  ];

  /*****************************
   * PLANNING
   *****************************/

  planning: PlanningActivite[] = [

    {

      id: this.generateId(),

      jour: 'Jour 1',

      horaire: '09:00',

      activite: "Réunion d'ouverture"

    }

  ];

  ngOnInit(): void {

    this.loadAudits();

  }
  /*****************************
 * CHARGER LES AUDITS
 *****************************/

loadAudits(): void {

  this.programmeService
    .getProgrammes()
    .subscribe({

      next: (programmes: ProgrammeAudit[]) => {

        this.programmes = programmes;

        this.auditsDisponibles = [];

        programmes.forEach((programme: ProgrammeAudit) => {

          programme.audits.forEach((audit: Audit) => {

            this.auditsDisponibles.push(audit);

          });

        });

      },

      error: (err: unknown) => {

        console.error(err);

        alert(
          "Impossible de charger les audits."
        );

      }

    });

}


/*****************************
 * CHANGEMENT D'AUDIT
 *****************************/

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


/*****************************
 * ID UNIQUE
 *****************************/

private generateId(): string {

  return Math.random()

    .toString(36)

    .substring(2, 10);

}


/*****************************
 * EQUIPE
 *****************************/

addEquipeMembre(): void {

  this.equipe.push({

    id: this.generateId(),

    nom: '',

    role: 'Auditeur'

  });

}


removeEquipeMembre(id: string): void {

  this.equipe = this.equipe.filter(

    (m: EquipeMembre) =>

      m.id !== id

  );

}


/*****************************
 * PLANNING
 *****************************/

addPlanningActivite(): void {

  this.planning.push({

    id: this.generateId(),

    jour: '',

    horaire: '',

    activite: ''

  });

}


removePlanningActivite(id: string): void {

  this.planning = this.planning.filter(

    (p: PlanningActivite) =>

      p.id !== id

  );

}


/*****************************
 * PROGRESSION
 *****************************/

get progression(): number {

  let rempli = 0;

  const total = 3;

  if (this.objectifs.trim()) rempli++;

  if (this.perimetre.trim()) rempli++;

  if (this.criteres.trim()) rempli++;

  return Math.round(

    rempli / total * 100

  );

}
/*****************************
 * ENREGISTRER
 *****************************/

savePlanAudit(): void {

  if (!this.auditSelectionne) {

    alert("Veuillez sélectionner un audit.");

    return;

  }

  const equipe: EquipeAudit[] = this.equipe.map(

    (m: EquipeMembre) => ({

      nom: m.nom,

      role: m.role

    })

  );

  const planning: PlanningAudit[] = this.planning.map(

    (p: PlanningActivite) => ({

      jour: p.jour,

      horaire: p.horaire,

      activite: p.activite

    })

  );

  const plan: PlanAuditModel = {

    audit: {
  id: this.auditSelectionne.id
} as Audit,

    objectifs: this.objectifs,

    perimetre: this.perimetre,

    criteres: this.criteres,

    equipe: equipe,

    planning: planning

  };

  this.planAuditService

    .createPlan(plan)

    .subscribe({

      next: () => {

        alert("Plan d'audit enregistré avec succès.");

      },

      error: (err: unknown) => {

        console.error(err);

        alert("Erreur lors de l'enregistrement.");

      }

    });

} }