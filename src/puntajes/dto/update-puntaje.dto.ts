import { PartialType } from '@nestjs/swagger';
import { CreatePuntajeDto } from './create-puntaje.dto';

export class UpdatePuntajeDto extends PartialType(CreatePuntajeDto) {}
