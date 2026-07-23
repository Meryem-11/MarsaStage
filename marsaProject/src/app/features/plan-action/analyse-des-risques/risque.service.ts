import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risque } from './risque.model';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  private apiUrl = 'http://localhost:8080/api/risques';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Risque[]> {
    return this.http.get<Risque[]>(this.apiUrl);
  }

  getByProcessus(code: string): Observable<Risque[]> {
    return this.http.get<Risque[]>(`${this.apiUrl}/processus/${code}`);
  }

  create(risque: Risque): Observable<Risque> {
    return this.http.post<Risque>(this.apiUrl, risque);
  }

  update(id: number, risque: Risque): Observable<Risque> {
    return this.http.put<Risque>(`${this.apiUrl}/${id}`, risque);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}