import { Injectable } from '@nestjs/common';
import { CreateCanjeDto } from './dto/create-canje.dto';
import { UpdateCanjeDto } from './dto/update-canje.dto';

@Injectable()
export class CanjesService {
  create(createCanjeDto: CreateCanjeDto) {
    return 'This action adds a new canje';
  }

  findAll() {
    return `This action returns all canjes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canje`;
  }

  update(id: number, updateCanjeDto: UpdateCanjeDto) {
    return `This action updates a #${id} canje`;
  }

  remove(id: number) {
    return `This action removes a #${id} canje`;
  }
}
