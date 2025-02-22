import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from './create.blog.dto';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
