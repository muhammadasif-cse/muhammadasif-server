import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create.blog.dto';
import { UpdateBlogDto } from './dto/update.blog.dto';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  // Create a new blog
  async create(createBlogDto: CreateBlogDto): Promise<APIResponse<Blog>> {
    const blog = this.blogsRepository.create(createBlogDto);
    const blogCreated = await this.blogsRepository.save(blog);
    return {
      status: HttpStatus.CREATED,
      message: 'Blog created successfully',
      data: blogCreated,
    };
  }

  // Get all blogs
  async findAll(paginationDto: PaginationDto): Promise<APIResponse<Blog>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;

    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [blogs, totalItems] = await this.blogsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      status: HttpStatus.CREATED,
      message: 'Blogs retrieved successfully',
      data: blogs,
      meta: {
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
        sortBy: orderBy,
        sortOrder,
      },
    };
  }

  // Get a single blog by ID
  async findOne(id: string): Promise<APIResponse<Blog>> {
    const blog = await this.blogsRepository.findOne({ where: { id } });

    if (!blog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Blog retrieved successfully',
      data: blog,
    };
  }

  // Update a blog
  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<APIResponse<Blog>> {
    await this.blogsRepository.update(id, updateBlogDto);
    const updatedBlog = await this.blogsRepository.findOne({
      where: { id },
    });

    if (!updatedBlog) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Blog updated successfully',
      data: updatedBlog,
    };
  }

  // Delete a blog
  async remove(id: string): Promise<APIResponse<Blog>> {
    const blogDeleted = await this.blogsRepository.delete(id);
    if (blogDeleted.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Blog not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Blog deleted successfully',
    };
  }
}
