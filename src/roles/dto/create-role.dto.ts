import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' del rol';
const UNIQUE_TEXT = ' (debe ser único en la base de datos)';
const NAME_FIELD =
  DESCRIPTION_PREFIX + 'el Nombre' + DESCRIPTION_SUFFIX + UNIQUE_TEXT;
const DESCRIPTION_FIELD =
  DESCRIPTION_PREFIX + 'la Descripción' + DESCRIPTION_SUFFIX;

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty({
    example: '',
    description: NAME_FIELD,
    maxLength: 60,
    required: true,
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: '',
    description: DESCRIPTION_FIELD,
    maxLength: 255,
    required: true,
  })
  descripcion: string;
}
