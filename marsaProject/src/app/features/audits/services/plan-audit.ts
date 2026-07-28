import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Audit } from './programme-audit';

/****************************
 * EQUIPE
 ****************************/
export interface EquipeAudit {

  id?: number;

  nom: string;

  role: string;

}

/****************************
 * PLANNING
 ****************************/
export interface PlanningAudit {

  id?: number;

  jour: string;

  horaire: string;

  activite: string;

}

/****************************
 * PLAN D'AUDIT
 ****************************/
export interface PlanAuditModel {

  id?: number;

  objectifs: string;

  perimetre: string;

  criteres: string;

  audit: Audit;

  equipe: EquipeAudit[];

  planning: PlanningAudit[];

}

@Injectable({
  providedIn: 'root'
})
export class PlanAuditService {

  private apiUrl = 'http://localhost:8080/api/plans';

  constructor(
    private http: HttpClient
  ) {}

  /****************************
   * GET ALL
   ****************************/
  getPlans(): Observable<PlanAuditModel[]> {

    return this.http.get<PlanAuditModel[]>(

      this.apiUrl

    );

  }

  /****************************
   * GET BY ID
   ****************************/
  getPlanById(id: number): Observable<PlanAuditModel[]> {

    return this.http.get<PlanAuditModel[]>(

      `${this.apiUrl}/${id}`

    );

  }

  /****************************
   * CREATE
   ****************************/
  createPlan(plan: PlanAuditModel): Observable<PlanAuditModel> {

    return this.http.post<PlanAuditModel>(

      this.apiUrl,

      plan

    );

  }

  /****************************
   * UPDATE
   ****************************/
  updatePlan(plan: PlanAuditModel): Observable<PlanAuditModel> {

    return this.http.put<PlanAuditModel>(

      `${this.apiUrl}/${plan.id}`,

      plan

    );

  }

  /****************************
   * DELETE
   ****************************/
  deletePlan(id: number): Observable<void> {

    return this.http.delete<void>(

      `${this.apiUrl}/${id}`

    );

  }

}