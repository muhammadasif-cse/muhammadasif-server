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
import { CreateSocialDto } from './dto/create.social.dto';
import { UpdateSocialDto } from './dto/update.social.dto';
import { Social } from './social.entity';
import { SocialsService } from './socials.service';

@ApiTags('socials')
@Controller('socials')
@UseGuards(ApiKeyGuard)
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  async create(
    @Body() createSocialDto: CreateSocialDto,
  ): Promise<APIResponse<Social>> {
    return this.socialsService.create(createSocialDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'DESC' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<APIResponse<Social>> {
    return this.socialsService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<APIResponse<Social>> {
    return this.socialsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSocialDto: UpdateSocialDto,
  ): Promise<APIResponse<Social>> {
    return this.socialsService.update(id, updateSocialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<APIResponse<Social>> {
    return this.socialsService.remove(id);
  }
}
