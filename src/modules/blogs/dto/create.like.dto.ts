import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
