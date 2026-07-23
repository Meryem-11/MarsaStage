import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionRisque } from './action-risque.model';

@Injectable({
  providedIn: 'root'
})
export class ActionRisqueService {
  private apiUrl = 'http://localhost:8080/api/actions-risques';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActionRisque[]> {
    return this.http.get<ActionRisque[]>(this.apiUrl);
  }

  getByRisque(idRisque: number): Observable<ActionRisque[]> {
    return this.http.get<ActionRisque[]>(`${this.apiUrl}/risque/${idRisque}`);
  }

  create(action: ActionRisque): Observable<ActionRisque> {
    return this.http.post<ActionRisque>(this.apiUrl, action);
  }

  update(id: number, action: ActionRisque): Observable<ActionRisque> {
    return this.http.put<ActionRisque>(`${this.apiUrl}/${id}`, action);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}