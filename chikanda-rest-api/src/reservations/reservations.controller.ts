import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ReservationsService } from './reservations.service';

@Controller('api/v1/reservations')
export class ReservationsController {
  constructor(private readonly resService: ReservationsService) {}

  // POST /api/v1/reservations - Create a booking
  @Post()
  async createReservation(@Body() body: any, @Res() res: Response) {
    const data = this.resService.create(body);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Reservation request submitted',
      data: data,
    });
  }

  // GET /api/v1/reservations - List all bookings
  @Get()
  async getReservations(@Res() res: Response) {
    const data = this.resService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      data: data,
    });
  }

  // PUT /api/v1/reservations/:id - Update status (e.g., Confirm)
  @Put(':id')
  async updateReservation(@Param('id') id: string, @Body('status') status: any, @Res() res: Response) {
    const updated = this.resService.updateStatus(id, status);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: updated,
    });
  }

  // DELETE /api/v1/reservations/:id - Cancel booking
  @Delete(':id')
  async cancelReservation(@Param('id') id: string, @Res() res: Response) {
    this.resService.remove(id);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reservation cancelled successfully',
    });
  }
}