import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'waiter' | 'kitchen' | 'admin';
}

@Injectable()
export class UserService {
  // Mock Database array
  private users: User[] = [
    { id: 1, name: 'Chisomo Phiri', email: 'c.phiri@unima.mw', role: 'admin' },
    { id: 2, name: 'Limbani Banda', email: 'l.banda@unima.mw', role: 'customer' }
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  create(userData: Omit<User, 'id'>): User {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<User>): User {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');
    
    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return this.users[userIndex];
  }

  remove(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }
}