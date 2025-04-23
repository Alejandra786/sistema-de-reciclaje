import { PartialType } from '@nestjs/swagger';
import { CreateReciclajeDto } from './create-reciclaje.dto';

export class UpdateReciclajeDto extends PartialType(CreateReciclajeDto) {}
