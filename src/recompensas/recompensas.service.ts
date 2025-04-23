import { Injectable } from '@nestjs/common';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';

@Injectable()
export class RecompensasService {
  create(createRecompensaDto: CreateRecompensaDto) {
    return 'This action adds a new recompensa';
  }

  findAll() {
    return `This action returns all recompensas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recompensa`;
  }

  update(id: number, updateRecompensaDto: UpdateRecompensaDto) {
    return `This action updates a #${id} recompensa`;
  }

  remove(id: number) {
    return `This action removes a #${id} recompensa`;
  }
}
