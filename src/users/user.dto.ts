import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @MaxLength(20)
  handle: string;

  dob: Date;

  @IsNotEmpty()
  password: string;
}

export class UserResponseDTO {
  @Expose()
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @Expose()
  @MaxLength(20)
  handle: string;

  constructor(id: number, name: string, handle: string) {
    this.id = id;
    this.name = name;
    this.handle = handle;
  }
}
