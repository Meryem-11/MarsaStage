import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PestelItem {
  id: string;
  text: string;
}

interface PestelCategory {
  key: string;
  label: string;
  placeholder: string;
  items: PestelItem[];
}

@Component({
  selector: 'app-pestel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pestel.html',
  styleUrl: './pestel.css'
})
export class Pestel {
  categories: PestelCategory[] = [
    { key: 'politique', label: 'Politique', placeholder: 'Ex: stabilité gouvernementale, régulation...', items: [] },
    { key: 'economique', label: 'Économique', placeholder: 'Ex: inflation, taux de change, croissance...', items: [] },
    { key: 'social', label: 'Social', placeholder: 'Ex: démographie, tendances de consommation...', items: [] },
    { key: 'technologique', label: 'Technologique', placeholder: 'Ex: innovation, automatisation...', items: [] },
    { key: 'ecologique', label: 'Écologique', placeholder: 'Ex: normes environnementales, climat...', items: [] },
    { key: 'legal', label: 'Légal', placeholder: 'Ex: droit du travail, conformité...', items: [] }
  ];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addItem(category: PestelCategory): void {
    category.items.push({ id: this.generateId(), text: '' });
  }

  removeItem(category: PestelCategory, id: string): void {
    const index = category.items.findIndex(item => item.id === id);
    if (index !== -1) category.items.splice(index, 1);
  }
}