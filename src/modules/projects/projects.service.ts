import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  // Create a new project
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
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
  async findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne({ where: { id } });
  }

  // Update a project
  async update(
    id: string,
    updateProjectDto: CreateProjectDto,
  ): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOne({ where: { id } });
  }

  // Delete a project
  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
