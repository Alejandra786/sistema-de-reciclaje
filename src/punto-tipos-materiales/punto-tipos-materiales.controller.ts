import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntoTiposMaterialesService } from './punto-tipos-materiales.service';
import { CreatePuntoTiposMaterialeDto } from './dto/create-punto-tipos-materiale.dto';
import { UpdatePuntoTiposMaterialeDto } from './dto/update-punto-tipos-materiale.dto';

@Controller('punto-tipos-materiales')
export class PuntoTiposMaterialesController {
  constructor(private readonly puntoTiposMaterialesService: PuntoTiposMaterialesService) {}

  @Post()
  create(@Body() createPuntoTiposMaterialeDto: CreatePuntoTiposMaterialeDto) {
    return this.puntoTiposMaterialesService.create(createPuntoTiposMaterialeDto);
  }

  @Get()
  findAll() {
    return this.puntoTiposMaterialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puntoTiposMaterialesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntoTiposMaterialeDto: UpdatePuntoTiposMaterialeDto) {
    return this.puntoTiposMaterialesService.update(+id, updatePuntoTiposMaterialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntoTiposMaterialesService.remove(+id);
  }
}
