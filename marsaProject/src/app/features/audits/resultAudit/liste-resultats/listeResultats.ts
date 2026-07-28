import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Router } from '@angular/router';

import {
  ResultatAudit,
  ResultatAuditService
} from '../../services/resultat-audit';

@Component({
  selector: 'app-liste-resultats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listeResultats.html',
  styleUrl: './listeResultats.css'
})
export class ListeResultats implements OnInit {

  resultats: ResultatAudit[] = [];

  constructor(
    private resultatService: ResultatAuditService,
   // private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResultats();
  }

  loadResultats(): void {

    this.resultatService.getResultats().subscribe({

      next: (data) => {
        console.log(data);

        this.resultats = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }
consulter(id:number){

//this.router.navigate(['/consulter-resultat',id]);

}
modifier(id:number){

//this.router.navigate(['/modifier-resultat',id]);

}
  deleteResultat(id:number){

if(confirm("Supprimer ce résultat ?")){

this.resultatService.deleteResultat(id).subscribe({

next:()=>{

this.loadResultats();

}

});

}

}


}