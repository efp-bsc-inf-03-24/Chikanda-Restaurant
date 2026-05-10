import { Injectable, NotFoundException } from '@nestjs/common';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  isAvailable: boolean;
}

@Injectable()
export class MenuService {
  private menu: MenuItem[] = [
    { 
        id: 1, 
        name: 'Nsima with Chambo', 
        price: 6500, 
        category: 'Main Course', 
        description: 'Traditional Malawian dish', 
        isAvailable: true 
    },
    { 
        id: 2, 
        name: 'Sobie Ginger', 
        price: 1500, 
        category: 'Drinks', 
        description: 'Refreshing local beverage', 
        isAvailable: true 
    }
  ];

  findAll(): MenuItem[] {
    return this.menu;
  }

  findOne(id: number): MenuItem {
    const item = this.menu.find(m => m.id === id);
    if (!item) throw new NotFoundException(`Menu item ${id} not found`);
    return item;
  }

  create(itemData: Omit<MenuItem, 'id'>): MenuItem {
    const newItem = { id: Date.now(), ...itemData };
    this.menu.push(newItem);
    return newItem;
  }

  update(id: number, updateData: Partial<MenuItem>): MenuItem {
    const index = this.menu.findIndex(m => m.id === id);
    if (index === -1) throw new NotFoundException('Menu item not found');
    
    this.menu[index] = { ...this.menu[index], ...updateData };
    return this.menu[index];
  }

  remove(id: number): void {
    this.menu = this.menu.filter(m => m.id !== id);
  }
}