import { Controller, Post, Get, Body, Param, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express'; // Crucial fix for your previous error
import { PaymentsService } from './payments.service';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /api/v1/payments
  @Post()
  async makePayment(
    @Body() body: { orderId: number; amount: number }, 
    @Res() res: Response
  ) {
    try {
      const payment = this.paymentsService.create(body);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Payment processed successfully',
        data: payment,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Payment failed',
        error: error.message,
      });
    }
  }

  // GET /api/v1/payments/:id
  @Get(':id')
  async getPaymentDetails(@Param('id') id: string, @Res() res: Response) {
    const payment = this.paymentsService.findOne(Number(id));

    if (!payment) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Payment record not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      data: payment,
    });
  }
}