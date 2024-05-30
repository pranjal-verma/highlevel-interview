import { HttpException, Injectable } from '@nestjs/common';
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
    try {
      const dbUser = new User();
      dbUser.name = user.name;
      dbUser.dob = user.dob;
      dbUser.handle = user.handle;
      const salt = bcrypt.genSaltSync(1);
      dbUser.password = bcrypt.hashSync(user.password, salt);
      const result = await this.userRepository.save(dbUser);
      return result;
    } catch (error) {
      // Handle unique constraint error for handle field
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Handle already exists', 422);
      }
      throw error;
    }
  }

  async getUser(userID: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userID } });
  }
}
