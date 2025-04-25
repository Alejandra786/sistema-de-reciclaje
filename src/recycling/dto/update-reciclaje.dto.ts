import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo utilizado para relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla reciclajes';
const USER_ID_FIELD =
  DESCRIPTION_PREFIX + 'el Identificador de Usuario' + DESCRIPTION_SUFFIX;
const PUNTO_ID_FIELD =
  DESCRIPTION_PREFIX +
  'el Identificador de los Puntos Reciclajes' +
  DESCRIPTION_SUFFIX;

export class UpdateRecyclingDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: USER_ID_FIELD,
    required: true,
  })
  usuario_id?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: PUNTO_ID_FIELD,
    required: true,
  })
  punto_id?: number;
}
