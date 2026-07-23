import { ProcessusService } from './../../processus/processus.service';

export interface Risque {
  idRisque?: number;
    id?: number;
  processus: ProcessusService | { id: number };
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