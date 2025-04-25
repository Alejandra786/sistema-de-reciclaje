import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' de la recompensa';
const NAME_FIELD =
  DESCRIPTION_PREFIX + 'el Nombre' + DESCRIPTION_SUFFIX;
const DESCRIPTION_FIELD =
  DESCRIPTION_PREFIX + 'la Descripción' + DESCRIPTION_SUFFIX;
const NECESSARY_POINTS_FIELD =
  DESCRIPTION_PREFIX + 'los Puntos Necesarios' + DESCRIPTION_SUFFIX;

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    example: '',
    description: NAME_FIELD,
    maxLength: 50,
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

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    example: 0,
    description: NECESSARY_POINTS_FIELD,
    maxLength: 30,
    required: true,
  })
  puntos_necesarios: number;
}
