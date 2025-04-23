import { PartialType } from '@nestjs/swagger';
import { CreateImpactosAmbientaleDto } from './create-impactos-ambientale.dto';

export class UpdateImpactosAmbientaleDto extends PartialType(CreateImpactosAmbientaleDto) {}
