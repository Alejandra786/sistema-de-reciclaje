import { Injectable } from '@nestjs/common';
import { CreatePuntoTiposMaterialeDto } from './dto/create-punto-tipos-materiale.dto';
import { UpdatePuntoTiposMaterialeDto } from './dto/update-punto-tipos-materiale.dto';

@Injectable()
export class PuntoTiposMaterialesService {
  create(createPuntoTiposMaterialeDto: CreatePuntoTiposMaterialeDto) {
    return 'This action adds a new puntoTiposMateriale';
  }

  findAll() {
    return `This action returns all puntoTiposMateriales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puntoTiposMateriale`;
  }

  update(id: number, updatePuntoTiposMaterialeDto: UpdatePuntoTiposMaterialeDto) {
    return `This action updates a #${id} puntoTiposMateriale`;
  }

  remove(id: number) {
    return `This action removes a #${id} puntoTiposMateriale`;
  }
}
