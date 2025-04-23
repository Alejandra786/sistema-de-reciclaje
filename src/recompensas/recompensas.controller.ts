import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecompensasService } from './recompensas.service';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';

@Controller('recompensas')
export class RecompensasController {
  constructor(private readonly recompensasService: RecompensasService) {}

  @Post()
  create(@Body() createRecompensaDto: CreateRecompensaDto) {
    return this.recompensasService.create(createRecompensaDto);
  }

  @Get()
  findAll() {
    return this.recompensasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recompensasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecompensaDto: UpdateRecompensaDto) {
    return this.recompensasService.update(+id, updateRecompensaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recompensasService.remove(+id);
  }
}
