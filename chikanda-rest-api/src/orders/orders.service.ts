import { Injectable, NotFoundException } from '@nestjs/common';

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableNo: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'served' | 'paid' | 'cancelled';
  createdAt: Date;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  
  createOrder(orderData: { tableNo: number; items: OrderItem[] }): Order {
    const total = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tableNo: orderData.tableNo,
      items: orderData.items,
      totalAmount: total,
      status: 'pending',
      createdAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  
  findAll(): Order[] {
    return this.orders;
  }

  
  findOne(id: string): Order {
    const order = this.orders.find(o => o.id === id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  
  updateStatus(id: string, status: Order['status']): Order {
    const order = this.findOne(id);
    order.status = status;
    return order;
  }
}