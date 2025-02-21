import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<APIResponse<User | any>> {
    const { page, limit, sortBy, sortOrder } = paginationDto;

    const validSortBy = ['id', 'createdAt'];
    const orderBy = validSortBy.includes(sortBy) ? sortBy : 'createdAt';

    const [users, totalItems] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    let usersResponse = users.map((user: User) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Users retrieved successfully',
      data: usersResponse,
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

  async findOne(id: string): Promise<APIResponse<User | any>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    let { password, ...userWithoutPassword } = user;
    return {
      status: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: userWithoutPassword,
    };
  }
}
