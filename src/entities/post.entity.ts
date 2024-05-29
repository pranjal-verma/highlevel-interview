import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
