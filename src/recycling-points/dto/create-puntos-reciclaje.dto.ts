import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' de los puntos de reciclaje';
const EXAMPLE_TIME = ' (Formato: HH:MM:SS)';
const NAME_FIELD = DESCRIPTION_PREFIX + 'el Nombre' + DESCRIPTION_SUFFIX;
const START_TIME_FIELD =
  DESCRIPTION_PREFIX +
  'el Tiempo de Inicio' +
  DESCRIPTION_SUFFIX +
  EXAMPLE_TIME;
const END_TIME_FIELD =
  DESCRIPTION_PREFIX + 'el Tiempo Final' + DESCRIPTION_SUFFIX + EXAMPLE_TIME;
const LOCATION_FIELD =
  DESCRIPTION_PREFIX + 'la Ubicaci[on' + DESCRIPTION_SUFFIX;
const LATITUDE_FIELD = DESCRIPTION_PREFIX + 'la Latitud' + DESCRIPTION_SUFFIX;
const LONGITUDE_FIELD = DESCRIPTION_PREFIX + 'la Longitud' + DESCRIPTION_SUFFIX;

export class CreateRecyclingPointDto {
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
  @MaxLength(8)
  @ApiProperty({
    example: '',
    description: START_TIME_FIELD,
    maxLength: 8,
    required: true,
  })
  hora_inicio: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  @ApiProperty({
    example: '',
    description: END_TIME_FIELD,
    maxLength: 8,
    required: true,
  })
  hora_fin: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: '',
    description: LOCATION_FIELD,
    maxLength: 100,
    required: true,
  })
  ubicación: string;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0.0,
    description: LATITUDE_FIELD,
    maxLength: 10,
    required: true,
  })
  latitud: number;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0.0,
    description: LONGITUDE_FIELD,
    maxLength: 10,
    required: true,
  })
  longitud: number;
}
