import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  tableNumber: number;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsNumber()
  guests: number;
}