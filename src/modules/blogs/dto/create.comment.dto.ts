import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  blogId: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  parentCommentId?: string;

  @IsString()
  comment: string;
}
export class ReplyCommentDto {
  @IsString()
  @IsOptional()
  blogId: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  parentCommentId?: string;

  @IsString()
  comment: string;
}
