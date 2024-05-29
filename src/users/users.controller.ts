import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserResponseDTO } from './user.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() createUserDto: UserDTO) {
    const user = await this.userService.createUser(createUserDto);

    // serialize and send data
    return plainToClass(UserResponseDTO, user, {
      strategy: 'excludeAll',
    });
  }
}
