import { Injectable, NotFoundException } from '@nestjs/common';

export interface Reservation {
  id: string;
  customerName: string;
  date: string;
  time: string;
  tableNo: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  // Logic to create a new reservation
  create(data: Omit<Reservation, 'id' | 'status'>): Reservation {
    const newReservation: Reservation = {
      id: `RES-${Date.now()}`,
      ...data,
      status: 'pending',
    };
    this.reservations.push(newReservation);
    return newReservation;
  }

  // Find all reservations for staff management
  findAll(): Reservation[] {
    return this.reservations;
  }

  // Update status (e.g., confirming a booking)
  updateStatus(id: string, status: Reservation['status']): Reservation {
    const resIdx = this.reservations.findIndex(r => r.id === id);
    if (resIdx === -1) throw new NotFoundException('Reservation not found');
    
    this.reservations[resIdx].status = status;
    return this.reservations[resIdx];
  }

  // Cancel a reservation
  remove(id: string): void {
    const initialLength = this.reservations.length;
    this.reservations = this.reservations.filter(r => r.id !== id);
    if (this.reservations.length === initialLength) throw new NotFoundException('Reservation not found');
  }
}