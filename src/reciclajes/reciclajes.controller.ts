import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReciclajesService } from './reciclajes.service';
import { CreateReciclajeDto } from './dto/create-reciclaje.dto';
import { UpdateReciclajeDto } from './dto/update-reciclaje.dto';

@Controller('reciclajes')
export class ReciclajesController {
  constructor(private readonly reciclajesService: ReciclajesService) {}

  @Post()
  create(@Body() createReciclajeDto: CreateReciclajeDto) {
    return this.reciclajesService.create(createReciclajeDto);
  }

  @Get()
  findAll() {
    return this.reciclajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reciclajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReciclajeDto: UpdateReciclajeDto) {
    return this.reciclajesService.update(+id, updateReciclajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reciclajesService.remove(+id);
  }
}
