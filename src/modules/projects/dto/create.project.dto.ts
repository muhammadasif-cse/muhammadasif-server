import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  techStack: string[];

  @IsArray()
  features: string[];

  @IsUrl()
  liveUrl: string;

  @IsUrl()
  githubUrl: string;

  @IsUrl()
  image: string;

  @IsString()
  highlightTitle: string;

  @IsString()
  highlightDescription: string;
}
