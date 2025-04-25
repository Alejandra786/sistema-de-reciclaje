import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo utilizado para relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla usuario_rol';
const USER_ID_FIELD =
  DESCRIPTION_PREFIX + 'un ID válido de un Punto de Reciclaje' + DESCRIPTION_SUFFIX;
const ROL_ID_FIELD =
  DESCRIPTION_PREFIX + 'un ID válido de un Tipo de Material' + DESCRIPTION_SUFFIX;

export class CreatePointMaterialTypeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: USER_ID_FIELD,
    required: true,
  })
  punto_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: ROL_ID_FIELD,
    required: true,
  })
  tipo_material_id: number;
}
