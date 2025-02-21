import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  techStack: string[];

  @IsArray()
  @IsOptional()
  features: string[];

  @IsUrl()
  @IsOptional()
  liveUrl: string;

  @IsUrl()
  @IsOptional()
  githubUrl: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  highlightTitle: string;

  @IsString()
  @IsOptional()
  highlightDescription: string;
}
