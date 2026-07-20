import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PartiePrenante {
  id: string;
  role: string;
  nom: string;
  type: string;
  influence: string;
  interet: string;
  attentes: string;
  risque: string;
  action: string;
}

@Component({
  selector: 'app-pp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pp.html',
  styleUrl: './pp.css'
})
export class Pp {

  parties: PartiePrenante[] = [
    {
      id: this.generateId(),
      nom: 'Clients',
      role: 'Utilisation des services portuaires',
    
      type: 'Externe',
      influence: 'Élevée',
      interet: 'Élevé',
      attentes: 'Qualité de service',
      risque: 'Perte de clients',
      action: 'Enquêtes de satisfaction'
    }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addPartie(): void {
    this.parties.push({
      id: this.generateId(),
      nom: '',
      
      role: '',
      type: 'Interne',
      influence: 'Faible',
      interet: 'Faible',
      attentes: '',
      risque: '',
      action: ''
    });
  }

  removePartie(id: string): void {
    const index = this.parties.findIndex(p => p.id === id);

    if (index !== -1) {
      this.parties.splice(index, 1);
    }
  }

  getBadgeClass(value: string): string {
    switch (value) {
      case 'Élevée':
      case 'Élevé':
        return 'badge-high';

      case 'Moyenne':
      case 'Moyen':
        return 'badge-medium';

      default:
        return 'badge-low';
    }
  }
}