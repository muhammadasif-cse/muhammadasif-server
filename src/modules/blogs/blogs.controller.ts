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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create.blog.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { Blog } from './entity/blog.entity';

@ApiTags('blogs')
@Controller('blogs')
@UseGuards(ApiKeyGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<APIResponse<Blog>> {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
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
  async findOne(@Param('id') id: string): Promise<APIResponse<Blog>> {
    return this.blogsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<APIResponse<Blog>> {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<APIResponse<Blog>> {
    return this.blogsService.remove(id);
  }
}
