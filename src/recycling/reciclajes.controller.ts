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
import { RecyclingsService } from './reciclajes.service';
import { CreateRecyclingDto } from './dto/create-reciclaje.dto';
import { UpdateRecyclingDto } from './dto/update-reciclaje.dto';

const ENTITY = 'reciclaje';
const ENTITY_PLURAL = 'reciclajes';
const CONTROLLER_NAME = 'reciclajes';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class RecyclingsController {
  constructor(private readonly recyclingsService: RecyclingsService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateRecyclingDto })
  create(@Body() createRecyclingDto: CreateRecyclingDto) {
    return this.recyclingsService.create(createRecyclingDto);
  }

  @Get()
  @ApiOperation({
    summary: `Obtiene la lista de todos los ${ENTITY_PLURAL} registrados`,
  })
  findAll() {
    return this.recyclingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Obtiene un ${ENTITY} por su identificador único` })
  findOne(@Param('id') id: number) {
    return this.recyclingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `Actualiza la información de un ${ENTITY} existente`,
  })
  update(
    @Param('id') id: number,
    @Body() updateRecyclingDto: UpdateRecyclingDto,
  ) {
    return this.recyclingsService.update(id, updateRecyclingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.recyclingsService.remove(id);
  }
}
