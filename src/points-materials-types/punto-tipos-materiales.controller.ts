import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PointMaterialTypesService } from './punto-tipos-materiales.service';
import { UpdatePointMaterialTypeDto } from './dto/update-punto-tipos-materiale.dto';
import { CreatePointMaterialTypeDto } from './dto/create-punto-tipos-materiale.dto';

@ApiTags('materials-list')
@Controller('materials-list')
export class PointMaterialTypesController {
  constructor(
    private readonly materialListsService: PointMaterialTypesService,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      'Crea una nueva relación punto de reciclaje y la lista de  materiales en el sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Punto de Lista de Materiales creado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreatePointMaterialTypeDto })
  create(@Body() dto: CreatePointMaterialTypeDto) {
    return this.materialListsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Obtiene el punto de la lista de todas las listas de materiales registrados',
  })
  findAll() {
    return this.materialListsService.findAll();
  }

  @Get(':punto_id/:tipo_material_id')
  @ApiOperation({
    summary:
      'Obtiene una punto de lista de material por punto_id y tipo_material_id',
  })
  @ApiParam({ name: 'punto_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  findOne(
    @Param('punto_id') punto_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
  ) {
    return this.materialListsService.findOne(punto_id, tipo_material_id);
  }

  @Patch(':punto_id/:tipo_material_id')
  @ApiOperation({
    summary:
      'Actualiza un punto de lista de material rol existente por punto_id y tipo_material_id',
  })
  @ApiParam({ name: 'punto_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  update(
    @Param('punto_id') punto_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
    @Body() dto: UpdatePointMaterialTypeDto,
  ) {
    return this.materialListsService.update(punto_id, tipo_material_id, dto);
  }

  @Delete(':punto_id/:tipo_material_id')
  @ApiOperation({
    summary:
      'Elimina lógicamente una relación de punto de reciclaje y material',
  })
  @ApiParam({ name: 'punto_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  remove(
    @Param('punto_id') punto_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
  ) {
    return this.materialListsService.remove(punto_id, tipo_material_id);
  }
}
