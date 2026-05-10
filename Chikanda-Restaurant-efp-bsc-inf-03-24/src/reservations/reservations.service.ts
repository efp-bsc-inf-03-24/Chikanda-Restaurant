import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {}

  findAll() {
    return this.reservationRepo.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepo.findOneBy({ id });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  create(dto: CreateReservationDto) {
    const reservation = this.reservationRepo.create(dto);
    return this.reservationRepo.save(reservation);
  }

  async update(id: number, dto: UpdateReservationDto) {
    const reservation = await this.findOne(id);
    Object.assign(reservation, dto);
    return this.reservationRepo.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    return this.reservationRepo.remove(reservation);
  }
}