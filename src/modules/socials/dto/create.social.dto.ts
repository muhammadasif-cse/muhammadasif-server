import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateSocialDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  href: string;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
