import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  tableNumber: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  guests: number;
}