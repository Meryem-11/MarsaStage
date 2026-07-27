import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PestelItemBackend {
  id?: number;
  categoryKey: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PestelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pestel';

  getAll(): Observable<PestelItemBackend[]> {
    return this.http.get<PestelItemBackend[]>(this.apiUrl);
  }

  create(item: PestelItemBackend): Observable<PestelItemBackend> {
    return this.http.post<PestelItemBackend>(this.apiUrl, item);
  }

  update(id: number, item: PestelItemBackend): Observable<PestelItemBackend> {
    return this.http.put<PestelItemBackend>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}