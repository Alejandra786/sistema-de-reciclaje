import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' del tipo de material';
const NAME_FIELD = DESCRIPTION_PREFIX + 'la Categoria' + DESCRIPTION_SUFFIX;
const NECESSARY_POINTS_FIELD =
  DESCRIPTION_PREFIX +
  'los Puntos Asignados por Kilogramo de Material' +
  DESCRIPTION_SUFFIX;

export class UpdateMaterialTypeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    example: '',
    description: NAME_FIELD,
    maxLength: 50,
    required: true,
  })
  categoria?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    example: 0,
    description: NECESSARY_POINTS_FIELD,
    maxLength: 30,
    required: true,
  })
  puntos_kg?: number;
}
