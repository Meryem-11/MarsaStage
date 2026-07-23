import { Risque } from '../analyse-des-risques/risque.model'; // ⚠️ ajuste le chemin

export interface ActionRisque {
    id?: number;
  idAction?: number;
  risque: Risque | { idRisque: number };
  descriptionAction: string;
  responsable: string;
  delai: string; // format 'yyyy-MM-dd'
  statut: 'Non commencée' | 'En cours' | 'Réalisée' | 'En retard';
  preuve?: string;
}