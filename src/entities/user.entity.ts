import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true })
  handle: string;

  @Column()
  dob: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;
}
