import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Min(1)
  @Max(5)
  rating: number;
}
