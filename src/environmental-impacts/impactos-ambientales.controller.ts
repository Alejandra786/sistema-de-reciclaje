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
import { EnvironmentalImpactsService } from './impactos-ambientales.service';
import { CreateEnvironmentalImpactDto } from './dto/create-impactos-ambientale.dto';
import { UpdateEnvironmentalImpactDto } from './dto/update-impactos-ambientale.dto';

const ENTITY = 'impacto ambiental';
const ENTITY_PLURAL = 'impactos ambientales';
const CONTROLLER_NAME = 'impactos-ambientales';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class EnvironmentalImpactsController {
  constructor(
    private readonly environmentalImpactsService: EnvironmentalImpactsService,
  ) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateEnvironmentalImpactDto })
  create(@Body() createEnvironmentalImpactDto: CreateEnvironmentalImpactDto) {
    return this.environmentalImpactsService.create(
      createEnvironmentalImpactDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: `Obtiene la lista de todos los ${ENTITY_PLURAL} registrados`,
  })
  findAll() {
    return this.environmentalImpactsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Obtiene un ${ENTITY} por su identificador único` })
  findOne(@Param('id') id: number) {
    return this.environmentalImpactsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `Actualiza la información de un ${ENTITY} existente`,
  })
  update(
    @Param('id') id: number,
    @Body() updateEnvironmentalImpactDto: UpdateEnvironmentalImpactDto,
  ) {
    return this.environmentalImpactsService.update(
      id,
      updateEnvironmentalImpactDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.environmentalImpactsService.remove(id);
  }
}
