import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

const PREFIX = 'Campo utilizado para';
const DESCRIPTION_PREFIX = PREFIX + ' representar ';
const RELATION_PREFIX = PREFIX + ' relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla canje';
const REWARD_ID_FIELD =
  RELATION_PREFIX + 'el Identificador de la Recompensa' + DESCRIPTION_SUFFIX;
const NAME_FIELD = DESCRIPTION_PREFIX + 'el Nombre' + DESCRIPTION_SUFFIX;
const DISCOUNT_PENCENTAGE_FIELD =
  DESCRIPTION_PREFIX + 'el Porcentaje Descuento' + DESCRIPTION_SUFFIX;
const START_TIME_FIELD =
  DESCRIPTION_PREFIX + 'la Hora de Inicio' + DESCRIPTION_SUFFIX;
const END_TIME_FIELD =
  DESCRIPTION_PREFIX + 'la Hora de Fin' + DESCRIPTION_SUFFIX;

export class UpdateDiscountDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '',
    description: REWARD_ID_FIELD,
    required: true,
  })
  recompensa_id?: number;

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
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  @ApiProperty({
    example: '',
    description: DISCOUNT_PENCENTAGE_FIELD,
    maxLength: 5,
    required: true,
  })
  porcentaje_descuento?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    example: '',
    description: START_TIME_FIELD,
    maxLength: 20,
    required: true,
  })
  fecha_inicio?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    example: 0,
    description: END_TIME_FIELD,
    maxLength: 20,
    required: true,
  })
  fecha_fin?: string;
}
