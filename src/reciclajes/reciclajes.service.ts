import { Injectable } from '@nestjs/common';
import { CreateReciclajeDto } from './dto/create-reciclaje.dto';
import { UpdateReciclajeDto } from './dto/update-reciclaje.dto';

@Injectable()
export class ReciclajesService {
  create(createReciclajeDto: CreateReciclajeDto) {
    return 'This action adds a new reciclaje';
  }

  findAll() {
    return `This action returns all reciclajes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reciclaje`;
  }

  update(id: number, updateReciclajeDto: UpdateReciclajeDto) {
    return `This action updates a #${id} reciclaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} reciclaje`;
  }
}
