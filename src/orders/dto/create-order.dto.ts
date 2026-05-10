import { IsNumber, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  totalAmount: number;

  @IsIn(['pending', 'preparing', 'ready', 'completed', 'cancelled'])
  status: string;

  @IsNumber()
  userId: number;
}