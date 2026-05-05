import { Controller, Get, Post, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { OrdersService } from './orders.service';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /api/v1/orders - Place a new order
  @Post()
  async placeOrder(@Body() body: { tableNo: number; items: any[] }, @Res() res: Response) {
    const order = this.ordersService.createOrder(body);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  }

  // GET /api/v1/orders - List all orders
  @Get()
  async getAllOrders(@Res() res: Response) {
    const orders = this.ordersService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      data: orders,
    });
  }

  // GET /api/v1/orders/:id - Get specific order details
  @Get(':id')
  async getOrderDetails(@Param('id') id: string, @Res() res: Response) {
    const order = this.ordersService.findOne(id);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: order,
    });
  }

  // PUT /api/v1/orders/:id/status - Update order status (Staff action)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string, 
    @Body('status') status: any, 
    @Res() res: Response
  ) {
    const updatedOrder = this.ordersService.updateStatus(id, status);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedOrder,
    });
  }
}