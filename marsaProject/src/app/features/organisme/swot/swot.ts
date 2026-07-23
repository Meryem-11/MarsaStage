import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwotService, AnalyseSWOT } from './swot.service';

@Component({
  selector: 'app-swot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './swot.html',
  styleUrl: './swot.css'
})
export class Swot implements OnInit {

  strengths: AnalyseSWOT[] = [];
  weaknesses: AnalyseSWOT[] = [];
  opportunities: AnalyseSWOT[] = [];
  threats: AnalyseSWOT[] = [];

  constructor(private swotService: SwotService) {}

  ngOnInit(): void {
    this.loadSwotData();
  }

  loadSwotData(): void {
    this.swotService.getAll().subscribe({
      next: (data) => {
        this.strengths = data.filter(item => item.type === 'FORCE');
        this.weaknesses = data.filter(item => item.type === 'FAIBLESSE');
        this.opportunities = data.filter(item => item.type === 'OPPORTUNITE');
        this.threats = data.filter(item => item.type === 'MENACE');
      },
      error: (err) => console.error('Erreur lors du chargement SWOT :', err)
    });
  }

  addItem(type: 'FORCE' | 'FAIBLESSE' | 'OPPORTUNITE' | 'MENACE'): void {
    const newItem: AnalyseSWOT = {
      type: type,
      description: '',
      priorite: 'MOYENNE'
    };

    // Création immédiate en base de données pour obtenir l'idSWOT
    this.swotService.create(newItem).subscribe({
      next: (savedItem) => {
        this.getQuadrantList(type).push(savedItem);
      },
      error: (err) => console.error('Erreur lors de la création :', err)
    });
  }

  saveItem(item: AnalyseSWOT): void {
    if (item.idSWOT) {
      this.swotService.update(item.idSWOT, item).subscribe({
        error: (err) => console.error('Erreur lors de la mise à jour :', err)
      });
    }
  }

  removeItem(item: AnalyseSWOT, list: AnalyseSWOT[]): void {
    if (item.idSWOT) {
      this.swotService.delete(item.idSWOT).subscribe({
        next: () => {
          const index = list.findIndex(i => i.idSWOT === item.idSWOT);
          if (index !== -1) list.splice(index, 1);
        },
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  private getQuadrantList(type: 'FORCE' | 'FAIBLESSE' | 'OPPORTUNITE' | 'MENACE'): AnalyseSWOT[] {
    switch (type) {
      case 'FORCE': return this.strengths;
      case 'FAIBLESSE': return this.weaknesses;
      case 'OPPORTUNITE': return this.opportunities;
      case 'MENACE': return this.threats;
    }
  }
}