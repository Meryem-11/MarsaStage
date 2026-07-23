import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnalyseSWOT {
  idSWOT?: number;
  type: 'FORCE' | 'FAIBLESSE' | 'OPPORTUNITE' | 'MENACE';
  description: string;
  priorite?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SwotService {
  private apiUrl = 'http://localhost:8080/api/swot'; // Ajustez l'URL si nécessaire

  constructor(private http: HttpClient) {}

  getAll(): Observable<AnalyseSWOT[]> {
    return this.http.get<AnalyseSWOT[]>(this.apiUrl);
  }

  create(item: AnalyseSWOT): Observable<AnalyseSWOT> {
    return this.http.post<AnalyseSWOT>(this.apiUrl, item);
  }

  update(id: number, item: AnalyseSWOT): Observable<AnalyseSWOT> {
    return this.http.put<AnalyseSWOT>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}