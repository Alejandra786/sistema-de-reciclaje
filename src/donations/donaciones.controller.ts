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
import { DonationsService } from './donaciones.service';
import { CreateDonationDto } from './dto/create-donacione.dto';

const ENTITY = 'donación';
const ENTITY_PLURAL = 'donaciones';
const CONTROLLER_NAME = 'donaciones';

@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: `Registra un nuevo ${ENTITY} en el sistema` })
  @ApiResponse({ status: 201, description: `${ENTITY} creado exitosamente` })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateDonationDto })
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  @ApiOperation({
    summary: `Obtiene la lista de todos los ${ENTITY_PLURAL} registrados`,
  })
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Obtiene un ${ENTITY} por su identificador único` })
  findOne(@Param('id') id: number) {
    return this.donationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `Actualiza la información de un ${ENTITY} existente`,
  })
  update(
    @Param('id') id: number,
    @Body() updateDonationDto: CreateDonationDto,
  ) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Elimina un ${ENTITY} del sistema` })
  remove(@Param('id') id: number) {
    return this.donationsService.remove(id);
  }
}
