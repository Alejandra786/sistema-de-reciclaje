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
import { SwapsService } from './canjes.service';
import { CreateSwapDto } from './dto/create-canje.dto';
import { UpdateSwapDto } from './dto/update-canje.dto';

const ENTITY = 'canje';
const ENTITY_PLURAL = 'canjes';
const CONTROLLER_NAME = 'canjes';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class SwapsController {
  constructor(private readonly rewardsService: SwapsService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateSwapDto })
  create(@Body() createSwapDto: CreateSwapDto) {
    return this.rewardsService.create(createSwapDto);
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
  update(@Param('id') id: number, @Body() updateSwapDto: UpdateSwapDto) {
    return this.rewardsService.update(id, updateSwapDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.rewardsService.remove(id);
  }
}
