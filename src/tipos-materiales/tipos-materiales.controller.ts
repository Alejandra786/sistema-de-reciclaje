import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposMaterialesService } from './tipos-materiales.service';
import { CreateTiposMaterialeDto } from './dto/create-tipos-materiale.dto';
import { UpdateTiposMaterialeDto } from './dto/update-tipos-materiale.dto';

@Controller('tipos-materiales')
export class TiposMaterialesController {
  constructor(private readonly tiposMaterialesService: TiposMaterialesService) {}

  @Post()
  create(@Body() createTiposMaterialeDto: CreateTiposMaterialeDto) {
    return this.tiposMaterialesService.create(createTiposMaterialeDto);
  }

  @Get()
  findAll() {
    return this.tiposMaterialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposMaterialesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposMaterialeDto: UpdateTiposMaterialeDto) {
    return this.tiposMaterialesService.update(+id, updateTiposMaterialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposMaterialesService.remove(+id);
  }
}
