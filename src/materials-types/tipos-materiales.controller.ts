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
import { MaterialTypesService } from './tipos-materiales.service';
import { CreateMaterialTypeDto } from './dto/create-tipos-materiale.dto';
import { UpdateMaterialTypeDto } from './dto/update-tipos-materiale.dto';

const ENTITY = 'tipo material';
const ENTITY_PLURAL = 'tipos de materiales';
const CONTROLLER_NAME = 'tipos-materiales';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class MaterialTypesController {
  constructor(private readonly rewardsService: MaterialTypesService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateMaterialTypeDto })
  create(@Body() createMaterialTypeDto: CreateMaterialTypeDto) {
    return this.rewardsService.create(createMaterialTypeDto);
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
  update(
    @Param('id') id: number,
    @Body() updateMaterialTypeDto: UpdateMaterialTypeDto,
  ) {
    return this.rewardsService.update(id, updateMaterialTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.rewardsService.remove(id);
  }
}
