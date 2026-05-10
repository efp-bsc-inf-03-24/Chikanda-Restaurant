import { Injectable } from '@nestjs/common';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [];

  // Logic to process a new payment (POST)
  create(paymentData: { orderId: number; amount: number }): Payment {
    const newPayment: Payment = {
      id: Date.now(),
      ...paymentData,
      status: 'completed', // In a real app, this would depend on a gateway response
      createdAt: new Date(),
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  // Logic to find a payment by ID (GET)
  findOne(id: number): Payment | undefined {
    return this.payments.find(p => p.id === id);
  }
}