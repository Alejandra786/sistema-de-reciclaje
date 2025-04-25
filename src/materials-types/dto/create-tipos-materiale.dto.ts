import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' del tipo de material';
const NAME_FIELD = DESCRIPTION_PREFIX + 'la Categoria' + DESCRIPTION_SUFFIX;
const NECESSARY_POINTS_FIELD =
  DESCRIPTION_PREFIX +
  'los Puntos Asignados por Kilogramo de Material' +
  DESCRIPTION_SUFFIX;

export class CreateMaterialTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: '',
    description: NAME_FIELD,
    maxLength: 100,
    required: true,
  })
  categoria: string;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0,
    description: NECESSARY_POINTS_FIELD,
    maxLength: 10,
    required: true,
  })
  puntos_kg: number;
}
