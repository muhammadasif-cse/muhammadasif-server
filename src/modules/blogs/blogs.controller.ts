import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/app-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create.blog.dto';
import { CreateCommentDto, ReplyCommentDto } from './dto/create.comment.dto';
import { CreateLikeDto } from './dto/create.like.dto';
import { CreateRatingDto } from './dto/create.rating.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { UpdateRatingDto } from './dto/update.rating.dto';
import { Blog } from './entity/blog.entity';
import { Comment } from './entity/comment.entity';
import { Like } from './entity/like.entity';
import { Rating } from './entity/rating.entity';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async create(
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<APIResponse<Blog>> {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'DESC' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<APIResponse<Blog>> {
    return this.blogsService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  async findOne(@Param('id') id: string): Promise<APIResponse<Blog>> {
    return this.blogsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<APIResponse<Blog>> {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async remove(@Param('id') id: string): Promise<APIResponse<Blog>> {
    return this.blogsService.remove(id);
  }

  // Endpoint to add a comment to a blog
  @Post(':id/comments')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async addComment(
    @Param('id') blogId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<APIResponse<Comment>> {
    return this.blogsService.addComment(blogId, createCommentDto);
  }

  // Endpoint to get all comments for a blog
  @Get(':id/comments')
  @UseGuards(ApiKeyGuard)
  async getComments(
    @Param('id') blogId: string,
  ): Promise<APIResponse<Comment[]>> {
    return this.blogsService.getComments(blogId);
  }

  // Endpoint to reply to a comment
  @Post(':blogId/comments/:parentCommentId/reply')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async replyToComment(
    @Param('blogId') blogId: string,
    @Param('parentCommentId') parentCommentId: string,
    @Body() replyCommentDto: ReplyCommentDto,
  ): Promise<APIResponse<Comment>> {
    return this.blogsService.replyToComment(
      blogId,
      parentCommentId,
      replyCommentDto,
    );
  }

  // Update a comment (or reply)
  @Put(':blogId/comments/:id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async updateComment(
    @Param('blogId') blogId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<APIResponse<Comment>> {
    return this.blogsService.updateComment(blogId, id, updateCommentDto);
  }

  // Endpoint to delete a comment
  @Delete(':blogId/comments/:id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async deleteComment(
    @Param('blogId') blogId: string,
    @Param('id') id: string,
  ): Promise<APIResponse<Comment>> {
    return this.blogsService.deleteComment(blogId, id);
  }

  @Get(':id/likes')
  @UseGuards(ApiKeyGuard)
  async getLikes(@Param('id') blogId: string): Promise<APIResponse<Like[]>> {
    return this.blogsService.getLikes(blogId);
  }
  // Endpoint to add a like to a blog
  @Post(':id/likes')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async addLike(
    @Param('id') blogId: string,
    @Body() createLikeDto: CreateLikeDto,
  ): Promise<APIResponse<Like>> {
    return this.blogsService.addLike(blogId, createLikeDto);
  }

  // Remove a like (unlike)
  @Delete(':blogId/likes/:id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async removeLike(
    @Param('blogId') blogId: string,
    @Param('id') id: string,
  ): Promise<APIResponse<Like>> {
    return this.blogsService.removeLike(blogId, id);
  }

  @Get(':id/ratings')
  @UseGuards(ApiKeyGuard)
  async getRatings(
    @Param('id') blogId: string,
  ): Promise<APIResponse<Rating[]>> {
    return this.blogsService.getRatings(blogId);
  }

  // Endpoint to add a rating to a blog
  @Post(':id/ratings')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async addRating(
    @Param('id') blogId: string,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<APIResponse<Rating>> {
    return this.blogsService.addRating(blogId, createRatingDto);
  }

  // Update a rating
  @Put(':blogId/ratings/:id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async updateRating(
    @Param('blogId') blogId: string,
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<APIResponse<Rating>> {
    return this.blogsService.updateRating(blogId, id, updateRatingDto);
  }
}
