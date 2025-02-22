import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './entity/blog.entity';
import { Comment } from './entity/comment.entity';
import { Like } from './entity/like.entity';
import { Rating } from './entity/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment, Like, Rating])],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
