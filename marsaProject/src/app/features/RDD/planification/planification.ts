import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SessionRDD {
  id: number;
  reference: string;
  titre: string;
  date: string;
  heure: string;
  lieu: string;
  participants: string;
  ordreDuJour: string;
  statut: 'Planifiée' | 'Terminée' | 'Reportée' | 'Annulée';
}

@Component({
  selector: 'app-planification-rdd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './planification.html',
  styleUrl: './planification.css'
})
export class PlanificationRdd {

  sessions: SessionRDD[] = [
    {
      id: 1,
      reference: 'RDD-2026-01',
      titre: 'Revue de direction semestrielle',
      date: '2026-08-20',
      heure: '09:30',
      lieu: 'Salle de conseil - Direction Agadir',
      participants: 'Directeur Port, Chef Exploitation, Responsable QSSE, Responsable HSE',
      ordreDuJour: 'Bilan des indicateurs S1 · Suivi des non-conformités · Revue des risques SST · Budget prévention 2027',
      statut: 'Planifiée'
    },
    {
      id: 2,
      reference: 'RDD-2026-00',
      titre: 'Revue de direction annuelle 2025',
      date: '2026-01-15',
      heure: '10:00',
      lieu: 'Salle de conseil - Direction Agadir',
      participants: 'Directeur Port, Comité QSSE',
      ordreDuJour: 'Résultats audits externes · Certification ISO · Plan d\'actions correctives',
      statut: 'Terminée'
    }
  ];

  private generateId(): number {
    return this.sessions.length > 0 ? Math.max(...this.sessions.map(s => s.id)) + 1 : 1;
  }

  addSession(): void {
    const num = this.sessions.length;
    this.sessions.unshift({
      id: this.generateId(),
      reference: `RDD-2026-${String(num).padStart(2, '0')}`,
      titre: '',
      date: '',
      heure: '',
      lieu: '',
      participants: '',
      ordreDuJour: '',
      statut: 'Planifiée'
    });
  }

  removeSession(id: number): void {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }

  get sessionsTriees(): SessionRDD[] {
    return [...this.sessions].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get totalSessions(): number {
    return this.sessions.length;
  }

  get sessionsPlanifiees(): number {
    return this.sessions.filter(s => s.statut === 'Planifiée').length;
  }

  get sessionsTerminees(): number {
    return this.sessions.filter(s => s.statut === 'Terminée').length;
  }

  get sessionsReportees(): number {
    return this.sessions.filter(s => s.statut === 'Reportée').length;
  }
}