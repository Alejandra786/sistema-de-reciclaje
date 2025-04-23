import { Injectable } from '@nestjs/common';
import { CreateImpactosAmbientaleDto } from './dto/create-impactos-ambientale.dto';
import { UpdateImpactosAmbientaleDto } from './dto/update-impactos-ambientale.dto';

@Injectable()
export class ImpactosAmbientalesService {
  create(createImpactosAmbientaleDto: CreateImpactosAmbientaleDto) {
    return 'This action adds a new impactosAmbientale';
  }

  findAll() {
    return `This action returns all impactosAmbientales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} impactosAmbientale`;
  }

  update(id: number, updateImpactosAmbientaleDto: UpdateImpactosAmbientaleDto) {
    return `This action updates a #${id} impactosAmbientale`;
  }

  remove(id: number) {
    return `This action removes a #${id} impactosAmbientale`;
  }
}
