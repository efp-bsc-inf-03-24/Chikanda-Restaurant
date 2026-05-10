import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isAvailable: boolean;
}