import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo utilizado para relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla usuario_rol';
const USER_ID_FIELD =
  DESCRIPTION_PREFIX + 'un ID válido de un Usuario' + DESCRIPTION_SUFFIX;
const ROL_ID_FIELD =
  DESCRIPTION_PREFIX + 'un ID válido de un Rol' + DESCRIPTION_SUFFIX;

export class CreateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: USER_ID_FIELD,
    required: true,
  })
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: ROL_ID_FIELD,
    required: true,
  })
  rol_id: number;
}
