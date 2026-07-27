import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlanAction {
  idAction?: number;
  intitule: string;
  description?: string;
  responsable?: string;
  origineModule?: string;
  origineId?: string;
  priorite?: 'FAIBLE' | 'MOYENNE' | 'ELEVEE' | 'CRITIQUE' | string;
  echeance?: string; // Format YYYY-MM-DD
  statut?: 'A_FAIRE' | 'EN_COURS' | 'TERMINEE' | 'SUSPENDUE' | string;
  dateCloture?: string;
  preuveNom?: string;
  cheminPreuve?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanActionService {
  private apiUrl = 'http://localhost:8080/api/plan-actions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PlanAction[]> {
    return this.http.get<PlanAction[]>(this.apiUrl);
  }

  getByOrigine(module: string, origineId: string): Observable<PlanAction[]> {
    return this.http.get<PlanAction[]>(`${this.apiUrl}/origine/${module}/${origineId}`);
  }

  create(action: PlanAction): Observable<PlanAction> {
    return this.http.post<PlanAction>(this.apiUrl, action);
  }

  update(id: number, action: PlanAction): Observable<PlanAction> {
    return this.http.put<PlanAction>(`${this.apiUrl}/${id}`, action);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadPreuve(id: number, file: File): Observable<PlanAction> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<PlanAction>(`${this.apiUrl}/${id}/upload-preuve`, formData);
  }
}