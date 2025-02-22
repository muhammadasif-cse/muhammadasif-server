import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from './create.blog.dto';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  author_id?: number;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
