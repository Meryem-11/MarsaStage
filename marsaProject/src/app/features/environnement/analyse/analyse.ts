import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Aspect {
  id: string;
  activite: string;
  aspect: string;
  impact: string;
  situation: string;
  niveau: string;
  mesures: string;
  actions: string;
}

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './analyse.html',
  styleUrl: './analyse.css'
})
export class Analyse {

  aspects: Aspect[] = [
    {
      id: this.generateId(),
      activite: 'Manutention des conteneurs',
      aspect: 'Consommation de carburant',
      impact: 'Émissions atmosphériques',
      situation: 'Normale',
      niveau: 'Élevé',
      mesures: 'Maintenance préventive',
      actions: 'Renouvellement progressif des engins'
    }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addAspect(): void {
    this.aspects.unshift({
      id: this.generateId(),
      activite: '',
      aspect: '',
      impact: '',
      situation: 'Normale',
      niveau: 'Faible',
      mesures: '',
      actions: ''
    });
  }

  removeAspect(id: string): void {
    this.aspects = this.aspects.filter(a => a.id !== id);
  }

  get totalAspects(): number {
    return this.aspects.length;
  }

  get significatifs(): number {
    return this.aspects.filter(a => a.niveau === 'Élevé').length;
  }

  get maitrises(): number {
    return this.aspects.filter(a => a.niveau !== 'Élevé').length;
  }
}