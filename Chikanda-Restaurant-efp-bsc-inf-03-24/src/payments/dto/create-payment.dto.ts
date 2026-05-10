import { IsNumber, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsEnum(['pending', 'completed', 'failed'])
  status: 'pending' | 'completed' | 'failed';

  @IsNumber()
  userId: number;
}