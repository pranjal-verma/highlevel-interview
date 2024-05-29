import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class UserFollowers {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @ManyToOne(() => User, (user) => user.id)
  follower_id: User;
}
