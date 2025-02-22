import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
