import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'customer' | 'waiter' | 'kitchen' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: UserRole;
}