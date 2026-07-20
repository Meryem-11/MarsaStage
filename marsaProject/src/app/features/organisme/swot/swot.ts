import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SwotItem {
  id: string;
  text: string;
}

@Component({
  selector: 'app-swot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './swot.html',
  styleUrl: './swot.css'
})
export class Swot {
  strengths: SwotItem[] = [{ id: this.generateId(), text: '' }];
  weaknesses: SwotItem[] = [{ id: this.generateId(), text: '' }];
  opportunities: SwotItem[] = [{ id: this.generateId(), text: '' }];
  threats: SwotItem[] = [{ id: this.generateId(), text: '' }];

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  addItem(list: SwotItem[]): void {
    list.push({ id: this.generateId(), text: '' });
  }

  removeItem(list: SwotItem[], id: string): void {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) list.splice(index, 1);
  }
}