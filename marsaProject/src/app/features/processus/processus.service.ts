import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Processus } from './processus-liste';

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {

  private apiUrl = 'http://localhost:8080/api/processus';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Processus[]> {
    return this.http.get<Processus[]>(this.apiUrl);
  }

  createProcessus(processus: Processus): Observable<Processus> {
    return this.http.post<Processus>(this.apiUrl, processus);
  }

  updateProcessus(code: string, processus: Processus): Observable<Processus> {
    return this.http.put<Processus>(`${this.apiUrl}/${code}`, processus);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}