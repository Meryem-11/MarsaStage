import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PartiePrenanteBackend {
  id?: number;
  nom: string;
  role: string;
  type: string;
  influence: string;
  interet: string;
  attentes: string;
  risque: string;
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class PpService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/parties-prenantes';

  getAll(): Observable<PartiePrenanteBackend[]> {
    return this.http.get<PartiePrenanteBackend[]>(this.apiUrl);
  }

  create(item: PartiePrenanteBackend): Observable<PartiePrenanteBackend> {
    return this.http.post<PartiePrenanteBackend>(this.apiUrl, item);
  }

  update(id: number, item: PartiePrenanteBackend): Observable<PartiePrenanteBackend> {
    return this.http.put<PartiePrenanteBackend>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}