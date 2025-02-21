import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { CreateSocialDto } from './dto/create.social.dto';
import { UpdateSocialDto } from './dto/update.social.dto';
import { Social } from './social.entity';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(Social)
    private socialsRepository: Repository<Social>,
  ) {}

  // Create a new social
  async create(createSocialDto: CreateSocialDto): Promise<APIResponse<Social>> {
    const social = this.socialsRepository.create(createSocialDto);
    const socialCreated = await this.socialsRepository.save(social);
    return {
      status: HttpStatus.CREATED,
      message: 'Social created successfully',
      data: socialCreated,
    };
  }

  // Get all socials
  async findAll(paginationDto: PaginationDto): Promise<APIResponse<Social>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;

    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [socials, totalItems] = await this.socialsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      status: HttpStatus.CREATED,
      message: 'Socials retrieved successfully',
      data: socials,
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

  // Get a single social by ID
  async findOne(id: string): Promise<APIResponse<Social>> {
    const social = await this.socialsRepository.findOne({ where: { id } });

    return {
      status: HttpStatus.OK,
      message: 'Social retrieved successfully',
      data: social,
    };
  }

  // Update a social
  async update(
    id: string,
    updateSocialDto: UpdateSocialDto,
  ): Promise<APIResponse<Social>> {
    await this.socialsRepository.update(id, updateSocialDto);
    const updatedSocial = await this.socialsRepository.findOne({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      message: 'Social updated successfully',
      data: updatedSocial,
    };
  }

  // Delete a Social
  async remove(id: string): Promise<APIResponse<Social>> {
    const socialDeleted = await this.socialsRepository.delete(id);
    if (socialDeleted.affected === 0) {
      throw new Error('Social not found');
    }
    return {
      status: HttpStatus.OK,
      message: 'Social deleted successfully',
    };
  }
}
