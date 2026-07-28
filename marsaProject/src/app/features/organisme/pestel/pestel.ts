import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PestelService, PestelItemBackend } from './pestel.service';

export interface PestelItem {
  id?: number;
  text: string;
  isNew?: boolean; // Permet de savoir si l'élément vient d'être créé localement
}

export interface PestelCategory {
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
export class Pestel implements OnInit {
  private pestelService = inject(PestelService);

  categories: PestelCategory[] = [
    { key: 'politique', label: 'Politique', placeholder: 'Ex: stabilité gouvernementale...', items: [] },
    { key: 'economique', label: 'Économique', placeholder: 'Ex: inflation, croissance...', items: [] },
    { key: 'social', label: 'Social', placeholder: 'Ex: démographie...', items: [] },
    { key: 'technologique', label: 'Technologique', placeholder: 'Ex: innovation, automatisation...', items: [] },
    { key: 'ecologique', label: 'Écologique', placeholder: 'Ex: normes environnementales...', items: [] },
    { key: 'legal', label: 'Légal', placeholder: 'Ex: droit du travail...', items: [] }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  // Chargement des éléments stockés en base
  loadData(): void {
    this.pestelService.getAll().subscribe({
      next: (data) => {
        // Vider les listes actuelles
        this.categories.forEach(cat => cat.items = []);
        
        // Dispatcher les éléments reçus dans chaque catégorie correspondant
        data.forEach(backendItem => {
          const category = this.categories.find(c => c.key === backendItem.categoryKey);
          if (category) {
            category.items.push({
              id: backendItem.id,
              text: backendItem.text,
              isNew: false
            });
          }
        });
      },
      error: (err) => console.error('Erreur lors du chargement PESTEL :', err)
    });
  }

  // Ajout local d'un champ vide
  addItem(category: PestelCategory): void {
    category.items.push({ text: '', isNew: true });
  }

  // Sauvegarde d'un élément (Création ou Mise à jour)
  saveItem(categoryKey: string, item: PestelItem): void {
    if (!item.text.trim()) return;

    if (item.isNew || !item.id) {
      // Création BDD
      const newItem: PestelItemBackend = { categoryKey, text: item.text };
      this.pestelService.create(newItem).subscribe({
        next: (createdItem) => {
          item.id = createdItem.id;
          item.isNew = false;
        },
        error: (err) => console.error('Erreur lors de la création :', err)
      });
    } else {
      // Mise à jour BDD
      const updatedItem: PestelItemBackend = { categoryKey, text: item.text };
      this.pestelService.update(item.id, updatedItem).subscribe({
        error: (err) => console.error('Erreur lors de la mise à jour :', err)
      });
    }
  }

  // Suppression BDD et Frontend
  removeItem(category: PestelCategory, item: PestelItem): void {
    if (item.id) {
      this.pestelService.delete(item.id).subscribe({
        next: () => {
          category.items = category.items.filter(i => i !== item);
        },
        error: (err) => console.error('Erreur de suppression :', err)
      });
    } else {
      // Si l'élément n'a pas encore été sauvegardé en BDD
      category.items = category.items.filter(i => i !== item);
    }
  }
}