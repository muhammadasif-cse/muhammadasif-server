import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';
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

  // Get all projects with pagination and search
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{ data: Project[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = this.projectsRepository.createQueryBuilder('project');

    if (search) {
      query.where(
        'project.title LIKE :search OR project.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return { data, total };
  }

  // Get a single project by ID
  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    return project;
  }

  // Update a project
  async update(
    id: string,
    updateProjectDto: CreateProjectDto,
  ): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    return project;
  }

  // Delete a project
  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
