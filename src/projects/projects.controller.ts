import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { createResponse } from 'src/utils/api-response.util';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ApiResponse<Project>> {
    const project = await this.projectsService.create(createProjectDto);
    return createResponse(
      HttpStatus.CREATED,
      'Project created successfully',
      project,
    );
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<ApiResponse<Project[]>> {
    const { data, total } = await this.projectsService.findAll(
      page,
      limit,
      search,
    );
    const totalPages = Math.ceil(total / limit);

    return {
      statusCode: HttpStatus.OK,
      message: 'Projects retrieved successfully',
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Project | null>> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      return createResponse(
        HttpStatus.NOT_FOUND,
        'Project not found',
        null,
        'Project not found',
      );
    }
    return createResponse(
      HttpStatus.OK,
      'Project retrieved successfully',
      project,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateProjectDto,
  ): Promise<ApiResponse<Project>> {
    const project = await this.projectsService.update(id, updateProjectDto);
    return createResponse(
      HttpStatus.OK,
      'Project updated successfully',
      project,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    await this.projectsService.remove(id);
    return createResponse(HttpStatus.OK, 'Project deleted successfully');
  }
}
