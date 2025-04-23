import { Injectable } from '@nestjs/common';
import { CreateTiposMaterialeDto } from './dto/create-tipos-materiale.dto';
import { UpdateTiposMaterialeDto } from './dto/update-tipos-materiale.dto';

@Injectable()
export class TiposMaterialesService {
  create(createTiposMaterialeDto: CreateTiposMaterialeDto) {
    return 'This action adds a new tiposMateriale';
  }

  findAll() {
    return `This action returns all tiposMateriales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposMateriale`;
  }

  update(id: number, updateTiposMaterialeDto: UpdateTiposMaterialeDto) {
    return `This action updates a #${id} tiposMateriale`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposMateriale`;
  }
}
