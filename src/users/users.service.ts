import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserDTO } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // TODO: movesalts to config
  async createUser(user: UserDTO): Promise<User> {
    const dbUser = new User();
    dbUser.name = user.name;
    dbUser.dob = user.dob;
    dbUser.handle = user.handle;
    const salt = bcrypt.genSaltSync(1);
    dbUser.password = bcrypt.hashSync(user.password, salt);

    return this.userRepository.save(dbUser);
  }

  async follow(userID: number, followeId: number) {
    console.log('follow', userID, followeId);
  }

  async getUser(userID: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userID } });
  }
}
