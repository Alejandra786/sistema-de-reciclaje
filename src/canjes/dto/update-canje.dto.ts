import { PartialType } from '@nestjs/swagger';
import { CreateCanjeDto } from './create-canje.dto';

export class UpdateCanjeDto extends PartialType(CreateCanjeDto) {}
