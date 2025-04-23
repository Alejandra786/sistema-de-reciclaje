import { Injectable } from '@nestjs/common';
import { CreateListasMaterialeDto } from './dto/create-listas-materiale.dto';
import { UpdateListasMaterialeDto } from './dto/update-listas-materiale.dto';

@Injectable()
export class ListasMaterialesService {
  create(createListasMaterialeDto: CreateListasMaterialeDto) {
    return 'This action adds a new listasMateriale';
  }

  findAll() {
    return `This action returns all listasMateriales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listasMateriale`;
  }

  update(id: number, updateListasMaterialeDto: UpdateListasMaterialeDto) {
    return `This action updates a #${id} listasMateriale`;
  }

  remove(id: number) {
    return `This action removes a #${id} listasMateriale`;
  }
}
