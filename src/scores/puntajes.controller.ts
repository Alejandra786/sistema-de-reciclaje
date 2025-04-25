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
import { ScoresService } from './puntajes.service';
import { CreateScoreDto } from './dto/create-puntaje.dto';
import { UpdateScoreDto } from './dto/update-puntaje.dto';

const ENTITY = 'puntaje';
const ENTITY_PLURAL = 'puntajes';
const CONTROLLER_NAME = 'puntajes';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateScoreDto })
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  @ApiOperation({
    summary: `Obtiene la lista de todos los ${ENTITY_PLURAL} registrados`,
  })
  findAll() {
    return this.scoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Obtiene un ${ENTITY} por su identificador único` })
  findOne(@Param('id') id: number) {
    return this.scoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `Actualiza la información de un ${ENTITY} existente`,
  })
  update(@Param('id') id: number, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoresService.update(id, updateScoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.scoresService.remove(id);
  }
}
