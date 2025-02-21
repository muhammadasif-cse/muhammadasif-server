import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class UpdateSocialDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @IsOptional()
  href: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  icon: string;
}
