import { PartialType } from '@nestjs/swagger';
import { CreateTiposMaterialeDto } from './create-tipos-materiale.dto';

export class UpdateTiposMaterialeDto extends PartialType(CreateTiposMaterialeDto) {}
