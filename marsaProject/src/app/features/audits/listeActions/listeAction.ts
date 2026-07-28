import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ProgrammeAuditService,
  Audit
} from '../services/programme-audit';

import {
  ActionCorrectiveService,
  ActionCorrective
} from '../services/action-corrective';


@Component({

  selector: 'app-liste-audit',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./listeAction.html',

  styleUrl:'./listeAction.css'

})


export class ListeAudit implements OnInit {


constructor(
 private programmeService:ProgrammeAuditService,
private actionService: ActionCorrectiveService
){}



audits:Audit[]=[];


auditSelectionne?:Audit;



actions:ActionCorrective[]=[];



ngOnInit():void{

 this.loadAudits();

}




/*
 Charger les audits depuis Spring Boot
*/

loadAudits(){

this.programmeService
.getProgrammes()
.subscribe({

next:(programmes)=>{


this.audits=[];


programmes.forEach(p=>{

 p.audits.forEach(a=>{

   this.audits.push(a);

 });

});


},


error:(err)=>{

console.error(err);

}


});


}





selectAudit(audit:Audit){

this.auditSelectionne=audit;


// plus tard:
// charger les actions depuis backend

this.actions=[];

}




addAction(){

this.actions.push({

description:'',

responsable:'',

echeance:'',

priorite:'Moyenne',

statut:'À faire'

});

}



removeAction(index:number){

this.actions.splice(index,1);

}


saveActions() {

  if (!this.auditSelectionne) {
    alert("Sélectionnez un audit.");
    return;
  }

  if (this.actions.length === 0) {
    alert("Aucune action à enregistrer.");
    return;
  }

  let nbEnregistrees = 0;

  this.actions.forEach(action => {

    if (!this.auditSelectionne?.id) {
      alert("Audit invalide");
      return;
    }

    const actionToSave = {
      description: action.description,
      responsable: action.responsable,
      echeance: action.echeance,
      priorite: action.priorite,
      statut: action.statut,
      audit: {
        id: this.auditSelectionne.id
      }
    };

    this.actionService.createAction(actionToSave).subscribe({

      next: (res) => {

        console.log("Enregistrée", res);

        nbEnregistrees++;

       if (nbEnregistrees === this.actions.length) {

  alert("Les actions correctives ont été enregistrées avec succès.");

  // Fermer les formulaires des nouvelles actions
  this.actions.splice(0, this.actions.length);

}
      },

      error: (err) => {

        console.error(err);
        alert("Erreur lors de l'enregistrement d'une action.");

      }

    });

  });

}
}