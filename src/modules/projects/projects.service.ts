import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  // Create a new project
  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<APIResponse<Project>> {
    const project = this.projectsRepository.create(createProjectDto);
    const projectCreated = await this.projectsRepository.save(project);
    return {
      status: HttpStatus.CREATED,
      message: 'Project created successfully',
      data: projectCreated,
    };
  }

  // Get all projects
  async findAll(paginationDto: PaginationDto): Promise<APIResponse<Project>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;

    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [projects, totalItems] = await this.projectsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      status: HttpStatus.CREATED,
      message: 'Projects retrieved successfully',
      data: projects,
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

  // Get a single project by ID
  async findOne(id: string): Promise<APIResponse<Project>> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Project not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  // Update a project
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<APIResponse<Project>> {
    await this.projectsRepository.update(id, updateProjectDto);
    const updatedProject = await this.projectsRepository.findOne({
      where: { id },
    });

    if (!updatedProject) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Project not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Project updated successfully',
      data: updatedProject,
    };
  }

  // Delete a project
  async remove(id: string): Promise<APIResponse<Project>> {
    const projectDeleted = await this.projectsRepository.delete(id);
    if (projectDeleted.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Project not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Project deleted successfully',
    };
  }
}
