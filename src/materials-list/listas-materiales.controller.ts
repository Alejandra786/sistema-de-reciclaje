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
import { MaterialListsService } from './listas-materiales.service';
import { CreateMaterialListDto } from './dto/create-listas-materiale.dto';
import { UpdateMaterialListDto } from './dto/update-listas-materiale.dto';

@ApiTags('materials-list')
@Controller('materials-list')
export class MaterialListsController {
  constructor(private readonly materialListsService: MaterialListsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva relación lista material en el sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Lista de Material creado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateMaterialListDto })
  create(@Body() dto: CreateMaterialListDto) {
    return this.materialListsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene la lista de todos los lista de materiales registrados',
  })
  findAll() {
    return this.materialListsService.findAll();
  }

  @Get(':reciclaje_id/:tipo_material_id')
  @ApiOperation({
    summary: 'Obtiene una lista de material por reciclaje_id y tipo_material_id',
  })
  @ApiParam({ name: 'reciclaje_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  findOne(
    @Param('reciclaje_id') reciclaje_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
  ) {
    return this.materialListsService.findOne(reciclaje_id, tipo_material_id);
  }

  @Patch(':reciclaje_id/:tipo_material_id')
  @ApiOperation({
    summary:
      'Actualiza una lista de material rol existente por reciclaje_id y tipo_material_id',
  })
  @ApiParam({ name: 'reciclaje_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  update(
    @Param('reciclaje_id') reciclaje_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
    @Body() dto: UpdateMaterialListDto,
  ) {
    return this.materialListsService.update(reciclaje_id, tipo_material_id, dto);
  }

  @Delete(':reciclaje_id/:tipo_material_id')
  @ApiOperation({
    summary:
      'Elimina lógicamente una relación de punto de reciclaje y material',
  })
  @ApiParam({ name: 'reciclaje_id', type: 'string' })
  @ApiParam({ name: 'tipo_material_id', type: 'string' })
  remove(
    @Param('reciclaje_id') reciclaje_id: number,
    @Param('tipo_material_id') tipo_material_id: number,
  ) {
    return this.materialListsService.remove(reciclaje_id, tipo_material_id);
  }
}
