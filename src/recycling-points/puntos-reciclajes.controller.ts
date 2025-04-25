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
import { RecyclingPointsService } from './puntos-reciclajes.service';
import { CreateRecyclingPointDto } from './dto/create-puntos-reciclaje.dto';
import { UpdateRecyclingPointDto } from './dto/update-puntos-reciclaje.dto';

@ApiTags('puntos-de-reciclajes')
@Controller('puntos-de-reciclajes')
export class RecyclingPointsController {
  constructor(
    private readonly recyclingPointsService: RecyclingPointsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registra un nuevo punto de reciclaje en el sistema' })
  @ApiResponse({ status: 201, description: 'Punto de reciclaje creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateRecyclingPointDto })
  create(@Body() createRecyclingPointDto: CreateRecyclingPointDto) {
    return this.recyclingPointsService.create(createRecyclingPointDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene la lista de todos los puntos de reciclaje registrados',
  })
  @ApiResponse({ status: 201, description: 'Punto de Reciclaje creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  findAll() {
    return this.recyclingPointsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un punto de reciclaje por su identificador único' })
  findOne(@Param('id') id: number) {
    return this.recyclingPointsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza la información de un punto de reciclaje existente' })
  update(@Param('id') id: number, @Body() updateRecyclingPointDto: UpdateRecyclingPointDto) {
    return this.recyclingPointsService.update(id, updateRecyclingPointDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un punto de reciclaje del sistema' })
  remove(@Param('id') id: number) {
    return this.recyclingPointsService.remove(id);
  }
}
