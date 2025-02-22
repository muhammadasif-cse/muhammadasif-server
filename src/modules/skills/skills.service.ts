import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create.skill';
import { UpdateSkillDto } from './dto/update.skill';
import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  // Create a new skill
  async create(createSkillDto: CreateSkillDto): Promise<APIResponse<Skill>> {
    const skill = this.skillsRepository.create(createSkillDto);
    const skillCreated = await this.skillsRepository.save(skill);
    return {
      status: HttpStatus.CREATED,
      message: 'Skill created successfully',
      data: skillCreated,
    };
  }

  // Get all skills
  async findAll(paginationDto: PaginationDto): Promise<APIResponse<Skill>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;

    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [skills, totalItems] = await this.skillsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      status: HttpStatus.CREATED,
      message: 'Skills retrieved successfully',
      data: skills,
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

  // Get a single skill by ID
  async findOne(id: string): Promise<APIResponse<Skill>> {
    const skill = await this.skillsRepository.findOne({ where: { id } });

    if (!skill) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Skill not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Skill retrieved successfully',
      data: skill,
    };
  }

  // Update a skill
  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<APIResponse<Skill>> {
    await this.skillsRepository.update(id, updateSkillDto);
    const updatedSkill = await this.skillsRepository.findOne({
      where: { id },
    });

    if (!updatedSkill) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Skill not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Skill updated successfully',
      data: updatedSkill,
    };
  }

  // Delete a Skill
  async remove(id: string): Promise<APIResponse<Skill>> {
    const skillDeleted = await this.skillsRepository.delete(id);
    if (skillDeleted.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Skill not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Skill deleted successfully',
    };
  }
}
