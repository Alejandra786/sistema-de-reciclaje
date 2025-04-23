import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanjesService } from './canjes.service';
import { CreateCanjeDto } from './dto/create-canje.dto';
import { UpdateCanjeDto } from './dto/update-canje.dto';

@Controller('canjes')
export class CanjesController {
  constructor(private readonly canjesService: CanjesService) {}

  @Post()
  create(@Body() createCanjeDto: CreateCanjeDto) {
    return this.canjesService.create(createCanjeDto);
  }

  @Get()
  findAll() {
    return this.canjesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canjesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanjeDto: UpdateCanjeDto) {
    return this.canjesService.update(+id, updateCanjeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canjesService.remove(+id);
  }
}
