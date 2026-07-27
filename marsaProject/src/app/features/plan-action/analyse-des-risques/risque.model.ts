import { Processus } from './../../processus/processus-liste';

export interface Risque {
  idRisque?: number;
    id?: number;
  processus: Processus| { id: number };
  code: string;
  description: string;
  categorie?: string;
  cause?: string;
  gravite: number;
  probabilite: number;
  detectabilite?: number;
  criticite: number;
  statut?: string;
  mesurePrevention?: string;
}