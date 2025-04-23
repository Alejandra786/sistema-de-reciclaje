import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImpactosAmbientalesService } from './impactos-ambientales.service';
import { CreateImpactosAmbientaleDto } from './dto/create-impactos-ambientale.dto';
import { UpdateImpactosAmbientaleDto } from './dto/update-impactos-ambientale.dto';

@Controller('impactos-ambientales')
export class ImpactosAmbientalesController {
  constructor(private readonly impactosAmbientalesService: ImpactosAmbientalesService) {}

  @Post()
  create(@Body() createImpactosAmbientaleDto: CreateImpactosAmbientaleDto) {
    return this.impactosAmbientalesService.create(createImpactosAmbientaleDto);
  }

  @Get()
  findAll() {
    return this.impactosAmbientalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impactosAmbientalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpactosAmbientaleDto: UpdateImpactosAmbientaleDto) {
    return this.impactosAmbientalesService.update(+id, updateImpactosAmbientaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impactosAmbientalesService.remove(+id);
  }
}
