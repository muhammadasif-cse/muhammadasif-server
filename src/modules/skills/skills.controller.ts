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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { CreateSkillDto } from './dto/create.skill';
import { UpdateSkillDto } from './dto/update.skill';
import { Skill } from './skill.entity';
import { SkillsService } from './skills.service';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ApiKeyGuard, RolesGuard)
  async create(
    @Body() createSkillDto: CreateSkillDto,
  ): Promise<APIResponse<Skill>> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'DESC' })
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<APIResponse<Skill>> {
    return this.skillsService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  async findOne(@Param('id') id: string): Promise<APIResponse<Skill>> {
    return this.skillsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<APIResponse<Skill>> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ApiKeyGuard, RolesGuard)
  async remove(@Param('id') id: string): Promise<APIResponse<Skill>> {
    return this.skillsService.remove(id);
  }
}
