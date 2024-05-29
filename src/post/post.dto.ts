import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  userId: number;
}
