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

export class PostResponseDto {
  id: number;
  title: string;
  body: string;
  userId: number;
}
