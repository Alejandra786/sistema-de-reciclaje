import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RewardsService } from './recompensas.service';
import { CreateRewardDto } from './dto/create-recompensa.dto';
import { UpdateRewardDto } from './dto/update-recompensa.dto';

const ENTITY = 'recompensa';
const ENTITY_PLURAL = 'recompensas';
const CONTROLLER_NAME = 'recompensas';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateRewardDto })
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  @ApiOperation({
    summary: `Obtiene la lista de todos los ${ENTITY_PLURAL} registrados`,
  })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Obtiene un ${ENTITY} por su identificador único` })
  findOne(@Param('id') id: number) {
    return this.rewardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `Actualiza la información de un ${ENTITY} existente`,
  })
  update(@Param('id') id: number, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.rewardsService.remove(id);
  }
}
