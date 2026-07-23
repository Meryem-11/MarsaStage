import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ProgrammeAudit,
  ProgrammeAuditService,
  Audit
} from '../../services/programme-audit';


@Component({
  selector: 'app-prog-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './progDetail.html',
  styleUrl: './progDetail.css'
})
export class ProgDetail implements OnInit {


  programme: ProgrammeAudit = {

    reference: '',
    annee: '',
    responsable: '',
    dateCreation: '',
    audits: []

  };


  loading = true;

  modeEdition = false;



  terminaux: string[] = [

    'Terminal Conteneurs',
    'Terminal Polyvalent',
    'Terminal Hydrocarbures',
    'Terminal Céréalier'

  ];



  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private programmeService: ProgrammeAuditService

  ) {}




  ngOnInit(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );



    if (isNaN(id)) {


      this.router.navigate([
        '/audits/progAudit'
      ]);


      return;

    }



    this.loadProgramme(id);


  }




  loadProgramme(id: number): void {


    this.loading = true;



    this.programmeService
      .getProgrammeById(id)
      .subscribe({



        next: (programme: ProgrammeAudit) => {


          this.programme = programme;


          this.loading = false;


        },



        error: (error: unknown) => {


          console.error(error);


          alert(
            'Impossible de charger le programme.'
          );


          this.router.navigate([
            '/audits/progAudit'
          ]);


        }


      });


  }





  retour(): void {


    this.router.navigate([
      '/audits/progAudit'
    ]);


  }





  // utilisé par le bouton Modifier du HTML
  activerEdition(): void {


    this.modeEdition = true;


  }





  // utilisé par le bouton Annuler du HTML
  annulerEdition(): void {


    this.modeEdition = false;


    // recharge les données originales

    if(this.programme.id){

      this.loadProgramme(
        this.programme.id
      );

    }


  }





  addAudit(): void {


    this.programme.audits.push({


      reference: '',

      titre: '',

      type: 'Interne',

      terminal: this.terminaux[0],

      auditeur: '',

      dateDebut: '',

      dateFin: '',

      statut: 'Planifié'


    });


  }





  removeAudit(index: number): void {


    if(
      confirm(
        'Supprimer cet audit ?'
      )
    ){


      this.programme.audits.splice(
        index,
        1
      );


    }


  }





  saveProgramme(): void {



    if(!this.programme.id){

      return;

    }



    this.programmeService
      .updateProgramme(this.programme)
      .subscribe({



        next: (programme: ProgrammeAudit) => {



          this.programme = programme;



          this.modeEdition = false;



          alert(
            'Programme modifié avec succès.'
          );


        },



        error: (error: unknown) => {


          console.error(error);



          alert(
            'Erreur lors de la modification.'
          );


        }



      });



  }





  get nbAudits(): number {


    return this.programme.audits.length;


  }





  get nbPlanifies(): number {


    return this.programme.audits.filter(

      (audit: Audit) =>

        audit.statut === 'Planifié'

    ).length;


  }





  get nbEnCours(): number {


    return this.programme.audits.filter(

      (audit: Audit) =>

        audit.statut === 'En cours'

    ).length;


  }





  get nbRealises(): number {


    return this.programme.audits.filter(

      (audit: Audit) =>

        audit.statut === 'Réalisé'

    ).length;


  }





  get nbReportes(): number {


    return this.programme.audits.filter(

      (audit: Audit) =>

        audit.statut === 'Reporté'

    ).length;


  }





  trackAudit(
    index: number,
    audit: Audit
  ): number {


    return audit.id ?? index;


  }



}