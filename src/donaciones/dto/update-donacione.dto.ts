import { PartialType } from '@nestjs/swagger';
import { CreateDonacioneDto } from './create-donacione.dto';

export class UpdateDonacioneDto extends PartialType(CreateDonacioneDto) {}
