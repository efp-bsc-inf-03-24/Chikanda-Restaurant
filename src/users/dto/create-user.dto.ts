import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['customer', 'waiter', 'kitchen', 'admin'])
  role: 'customer' | 'waiter' | 'kitchen' | 'admin';
}