import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ActionCorrective {

  id?: number;

  description: string;

  responsable: string;

  echeance: string;

  priorite: string;

  statut: string;

  audit?: {
    id:number;
  };

}



@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveService {


  private apiUrl = 'http://localhost:8080/api/actions';


  constructor(
    private http: HttpClient
  ){}



  createAction(action: ActionCorrective): Observable<ActionCorrective>{

    return this.http.post<ActionCorrective>(
      this.apiUrl,
      action
    );

  }


  getActions(): Observable<ActionCorrective[]>{

    return this.http.get<ActionCorrective[]>(
      this.apiUrl
    );

  }


  getActionsByAudit(id:number): Observable<ActionCorrective[]>{

    return this.http.get<ActionCorrective[]>(
      `${this.apiUrl}/audit/${id}`
    );

  }


  deleteAction(id:number){

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}