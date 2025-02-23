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
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<APIResponse<Project>> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'DESC' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<APIResponse<Project>> {
    return this.projectsService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  async findOne(@Param('id') id: string): Promise<APIResponse<Project>> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<APIResponse<Project>> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  async remove(@Param('id') id: string): Promise<APIResponse<Project>> {
    return this.projectsService.remove(id);
  }
}
