import { PartialType } from '@nestjs/swagger';
import { CreatePuntoTiposMaterialeDto } from './create-punto-tipos-materiale.dto';

export class UpdatePuntoTiposMaterialeDto extends PartialType(CreatePuntoTiposMaterialeDto) {}
