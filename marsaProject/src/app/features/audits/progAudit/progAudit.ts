import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ProgrammeAudit,
  Audit,
  ProgrammeAuditService
} from './../services/programme-audit';

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
    private programmeService: ProgrammeAuditService,
    private router: Router
  ) {}


  /******************************
   * LISTES
   ******************************/

  programmes: ProgrammeAudit[] = [];

  programmesFiltres: ProgrammeAudit[] = [];

  isEditing = false;


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
testClick(): void {
  console.log('LE BOUTON MARCHE');
}
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


    this.programmeService
      .getProgrammes()
      .subscribe({

        next: (data: ProgrammeAudit[]) => {


          this.programmes = data;


          this.programmesFiltres = [
            ...data
          ];


          this.updateStatistics();


        },


        error: (err: unknown) => {


          console.error(
            'Erreur chargement programmes : ',
            err
          );


        }


      });


  }




  /******************************
   * STATISTIQUES
   ******************************/

  updateStatistics(): void {


    this.totalProgrammes =
      this.programmes.length;


    this.totalAudits = 0;

    this.auditsPlanifies = 0;

    this.auditsEnCours = 0;

    this.auditsRealises = 0;

    this.auditsReportes = 0;



    this.programmes.forEach(
      (programme: ProgrammeAudit) => {


        this.totalAudits +=
          programme.audits.length;



        programme.audits.forEach(
          (audit: Audit) => {


            switch(audit.statut){


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


          }
        );


      }
    );


  }




  /******************************
   * FILTRES
   ******************************/

  applyFilters(): void {


    this.programmesFiltres =
      this.programmes.filter(
        (programme: ProgrammeAudit) => {


          const recherche =
            this.recherche.toLowerCase();



          const okRecherche =

            this.recherche === '' ||

            programme.reference
              .toLowerCase()
              .includes(recherche)

            ||

            programme.responsable
              .toLowerCase()
              .includes(recherche);



          const okAnnee =

            this.filtreAnnee === '' ||

            programme.annee === this.filtreAnnee;



          const okResponsable =

            this.filtreResponsable === '' ||

            programme.responsable
              .toLowerCase()
              .includes(
                this.filtreResponsable
                  .toLowerCase()
              );



          return (

            okRecherche &&

            okAnnee &&

            okResponsable

          );


        }
      );


  }



  /******************************
   * AJOUT AUDIT
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



    this.programme.audits.push(
      nouvelAudit
    );


  }



  /******************************
   * SUPPRESSION AUDIT
   ******************************/

  removeAudit(index:number): void {


    if(

      index < 0 ||

      index >= this.programme.audits.length

    ){

      return;

    }



    this.programme.audits.splice(
      index,
      1
    );


  }
    /******************************
   * ENREGISTREMENT PROGRAMME
   ******************************/

  saveProgramme(): void {


    if(

      this.programme.reference.trim() === '' ||

      this.programme.annee.trim() === '' ||

      this.programme.responsable.trim() === ''

    ){

      alert(
        'Veuillez compléter les informations du programme.'
      );

      return;

    }



    if(this.programme.audits.length === 0){


      alert(
        'Veuillez ajouter au moins un audit.'
      );

      return;


    }



    // Validation des audits

    for(
      const audit of this.programme.audits
    ){


      if(

        audit.reference.trim() === '' ||

        audit.titre.trim() === '' ||

        audit.auditeur.trim() === ''

      ){


        alert(
          'Chaque audit doit être complètement renseigné.'
        );

        return;


      }



      if(

        !audit.dateDebut ||

        !audit.dateFin

      ){


        alert(
          'Veuillez renseigner les dates de tous les audits.'
        );

        return;


      }


    }
 



    /******************************
     * MODEFICATION
     ******************************/

    if(this.isEditing){



      this.programmeService
        .updateProgramme(this.programme)
        .subscribe({



          next: (programme: ProgrammeAudit) => {



            const index =
              this.programmes.findIndex(
                (p: ProgrammeAudit) =>
                  p.id === programme.id
              );



            if(index !== -1){

              this.programmes[index] =
                programme;

            }



            alert(
              'Programme modifié avec succès.'
            );



            this.isEditing = false;


            this.resetForm();


            this.loadProgrammes();


          },



          error: (err: unknown) => {


            console.error(
              'Erreur modification : ',
              err
            );


          }



        });



      return;


    }





    /******************************
     * MODE CREATION
     ******************************/


    const programmeAEnvoyer:
      ProgrammeAudit = {



      reference:
        this.programme.reference,



      annee:
        this.programme.annee,



      responsable:
        this.programme.responsable,



      dateCreation:
        this.programme.dateCreation,



      audits:
        this.programme.audits.map(
          (audit: Audit) => ({



            reference:
              audit.reference,



            titre:
              audit.titre,



            type:
              audit.type,



            terminal:
              audit.terminal,



            auditeur:
              audit.auditeur,



            dateDebut:
              audit.dateDebut,



            dateFin:
              audit.dateFin,



            statut:
              audit.statut



          })
        )



    };





    this.programmeService
      .createProgramme(programmeAEnvoyer)
      .subscribe({



        next: (programmeSauvegarde: ProgrammeAudit) => {



          console.log(
            'Programme enregistré : ',
            programmeSauvegarde
          );



          alert(
            'Programme enregistré avec succès.'
          );



          this.resetForm();


          this.loadProgrammes();



        },



        error: (err: unknown) => {



          console.error(
            'Erreur enregistrement : ',
            err
          );



          alert(
            "Impossible d'enregistrer le programme."
          );



        }



      });



  }





  /******************************
   * RESET FORMULAIRE
   ******************************/

  resetForm(): void {


    this.programme = {


      reference: '',


      annee:
        String(
          new Date().getFullYear()
        ),


      responsable: '',


      dateCreation:
        new Date()
          .toISOString()
          .substring(0,10),



      audits: []

    };


  }




  /******************************
   * REFRESH
   ******************************/

  refresh(): void {

    this.loadProgrammes();

  }





  /******************************
   * STATISTIQUES PAR PROGRAMME
   ******************************/


  getNombreAudits(
    programme: ProgrammeAudit
  ): number {


    return programme.audits.length;


  }





  getAuditsRealises(
    programme: ProgrammeAudit
  ): number {


    return programme.audits.filter(

      (audit: Audit) =>
        audit.statut === 'Réalisé'

    ).length;


  }





  getAuditsPlanifies(
    programme: ProgrammeAudit
  ): number {


    return programme.audits.filter(

      (audit: Audit) =>
        audit.statut === 'Planifié'

    ).length;


  }





  getAuditsEnCours(
    programme: ProgrammeAudit
  ): number {


    return programme.audits.filter(

      (audit: Audit) =>
        audit.statut === 'En cours'

    ).length;


  }





  getAuditsReportes(
    programme: ProgrammeAudit
  ): number {


    return programme.audits.filter(

      (audit: Audit) =>
        audit.statut === 'Reporté'

    ).length;


  }





  getProgression(
    programme: ProgrammeAudit
  ): number {



    if(programme.audits.length === 0){

      return 0;

    }



    return Math.round(

      (

        this.getAuditsRealises(programme)

        /

        programme.audits.length

      )

      *

      100

    );


  }





  /******************************
   * TRI
   ******************************/


  sortByReference(): void {


    this.programmesFiltres.sort(

      (a: ProgrammeAudit,b: ProgrammeAudit)=>

        a.reference.localeCompare(
          b.reference
        )

    );


  }





  sortByAnnee(): void {


    this.programmesFiltres.sort(

      (a: ProgrammeAudit,b: ProgrammeAudit)=>

        b.annee.localeCompare(
          a.annee
        )

    );


  }





  sortByResponsable(): void {


    this.programmesFiltres.sort(

      (a: ProgrammeAudit,b: ProgrammeAudit)=>

        a.responsable.localeCompare(
          b.responsable
        )

    );


  }





  clearFilters(): void {


    this.recherche = '';

    this.filtreAnnee = '';

    this.filtreResponsable = '';



    this.programmesFiltres =
      [
        ...this.programmes
      ];


  }





  /******************************
   * ACTIONS
   ******************************/





  modifierProgramme(id: number): void {

  console.log("OUVERTURE DETAIL", id);

  this.router.navigate([
    '/audits/progAudit/progDetail',
    id
  ]);

}



  supprimerProgramme(id:number): void {



    if(
      confirm(
        "Supprimer ce programme d'audit ?"
      )
    ){



      this.programmeService
        .deleteProgramme(id)
        .subscribe({



          next: () => {


            this.loadProgrammes();


          },



          error: (err: unknown)=>{


            console.error(
              'Erreur suppression : ',
              err
            );


          }



        });



    }


  }


}