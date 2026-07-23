import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Audit {

  id?: number;

  reference: string;
  titre: string;
  type: string;
  terminal: string;
  auditeur: string;
  dateDebut: string;
  dateFin: string;
  statut: string;

}

export interface ProgrammeAudit {

  id?: number;

  reference: string;
  annee: string;
  responsable: string;
  dateCreation: string;

  audits: Audit[];

}

@Injectable({
  providedIn: 'root'
})
export class ProgrammeAuditService {

  private apiUrl = 'http://localhost:8080/api/programmes';

  constructor(private http: HttpClient) {}

  getProgrammes(): Observable<ProgrammeAudit[]> {
    return this.http.get<ProgrammeAudit[]>(this.apiUrl);
  }
  getProgrammeById(id: number): Observable<ProgrammeAudit> {
  return this.http.get<ProgrammeAudit>(`${this.apiUrl}/${id}`);
}

  createProgramme(programme: ProgrammeAudit): Observable<ProgrammeAudit> {
    return this.http.post<ProgrammeAudit>(this.apiUrl, programme);
  }

  deleteProgramme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



updateProgramme(programme: ProgrammeAudit): Observable<ProgrammeAudit> {
  return this.http.put<ProgrammeAudit>(
    `${this.apiUrl}/${programme.id}`,
    programme
  );
}

}