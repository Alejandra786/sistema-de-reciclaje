import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

const PREFIX = 'Campo utilizado para';
const DESCRIPTION_PREFIX = PREFIX + ' representar ';
const RELATION_PREFIX = PREFIX + ' relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla Impacto Ambiental';
const RECYCLING_ID_FIELD =
  RELATION_PREFIX +
  'el Identificador de la tabla Reciclaje' +
  DESCRIPTION_SUFFIX;
const KG_RECYCLED_ID_FIELD =
  RELATION_PREFIX + 'los Kilogramos Reciclados' + DESCRIPTION_SUFFIX;
const CO2_REDUCED_FIELD =
  DESCRIPTION_PREFIX + 'el CO2 Reducido' + DESCRIPTION_SUFFIX;

export class CreateEnvironmentalImpactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: RECYCLING_ID_FIELD,
    required: true,
  })
  reciclaje_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0,
    description: KG_RECYCLED_ID_FIELD,
    maxLength: 10,
    required: true,
  })
  kg_reciclados: number;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0,
    description: CO2_REDUCED_FIELD,
    maxLength: 10,
    required: true,
  })
  CO2_reducidos: number;
}
