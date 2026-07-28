import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Audit } from './programme-audit';



export interface ConstatAudit{

  id?: number;

  categorie: string;

  description: string;

  exigence: string;

  responsable: string;

  echeance: string;

  statut: string;

}



export interface ResultatAudit{

  id?: number;

  score: number;

  conclusion: string;

  audit: Audit;

  constats: ConstatAudit[];

}



@Injectable({

  providedIn: 'root'

})

export class ResultatAuditService{

  private apiUrl = 'http://localhost:8080/api/resultats';



  constructor(

    private http: HttpClient

  ){}



  /***********************************
   * TOUS LES RESULTATS
   ***********************************/

  getResultats(): Observable<ResultatAudit[]>{

    return this.http.get<ResultatAudit[]>(

      this.apiUrl

    );

  }



  /***********************************
   * RESULTAT PAR ID
   ***********************************/

  getResultatById(

    id:number

  ):Observable<ResultatAudit>{

    return this.http.get<ResultatAudit>(

      `${this.apiUrl}/${id}`

    );

  }



  /***********************************
   * CREER
   ***********************************/

  createResultat(

    resultat:ResultatAudit

  ):Observable<ResultatAudit>{

    return this.http.post<ResultatAudit>(

      this.apiUrl,

      resultat

    );

  }



  /***********************************
   * MODIFIER
   ***********************************/

  updateResultat(

    resultat:ResultatAudit

  ):Observable<ResultatAudit>{

    return this.http.put<ResultatAudit>(

      `${this.apiUrl}/${resultat.id}`,

      resultat

    );

  }



  /***********************************
   * SUPPRIMER
   ***********************************/

  deleteResultat(

    id:number

  ):Observable<void>{

    return this.http.delete<void>(

      `${this.apiUrl}/${id}`

    );

  }

}