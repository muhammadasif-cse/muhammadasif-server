import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSkillDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  note: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  message: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  img: string;
}
