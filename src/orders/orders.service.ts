import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  create(dto: CreateOrderDto) {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.findOne(id);
    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }
}