import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProgrammeItem {
  id: string;
  reference: string;
  objectif: string;
  action: string;
  responsable: string;
  indicateur: string;
  cible: string;
  statut: string;
  avancement: number;
  echeance: string;
}

@Component({
  selector: 'app-programme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './programme.html',
  styleUrl: './programme.css'
})
export class Programme {

  programmes: ProgrammeItem[] = [
    {
      id: this.generateId(),
      reference: 'PE-001',
      objectif: 'Réduire la consommation de carburant',
      action: 'Former les conducteurs à l’éco-conduite',
      responsable: 'Responsable HSE',
      indicateur: 'Litres consommés',
      cible: '-10%',
      statut: 'En cours',
      avancement: 60,
      echeance: '2027-12-31'
    }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addProgramme(): void {
    this.programmes.unshift({
      id: this.generateId(),
      reference: '',
      objectif: '',
      action: '',
      responsable: '',
      indicateur: '',
      cible: '',
      statut: 'À faire',
      avancement: 0,
      echeance: ''
    });
  }

  removeProgramme(id: string): void {
    this.programmes = this.programmes.filter(p => p.id !== id);
  }

  get total(): number {
    return this.programmes.length;
  }

  get enCours(): number {
    return this.programmes.filter(p => p.statut === 'En cours').length;
  }

  get termines(): number {
    return this.programmes.filter(p => p.statut === 'Terminé').length;
  }

  get retard(): number {
    return this.programmes.filter(p => p.statut === 'En retard').length;
  }
}