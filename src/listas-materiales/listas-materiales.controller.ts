import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListasMaterialesService } from './listas-materiales.service';
import { CreateListasMaterialeDto } from './dto/create-listas-materiale.dto';
import { UpdateListasMaterialeDto } from './dto/update-listas-materiale.dto';

@Controller('listas-materiales')
export class ListasMaterialesController {
  constructor(private readonly listasMaterialesService: ListasMaterialesService) {}

  @Post()
  create(@Body() createListasMaterialeDto: CreateListasMaterialeDto) {
    return this.listasMaterialesService.create(createListasMaterialeDto);
  }

  @Get()
  findAll() {
    return this.listasMaterialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listasMaterialesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListasMaterialeDto: UpdateListasMaterialeDto) {
    return this.listasMaterialesService.update(+id, updateListasMaterialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listasMaterialesService.remove(+id);
  }
}
