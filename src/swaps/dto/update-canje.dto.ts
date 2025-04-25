import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo utilizado para relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla canje';
const USER_ID_FIELD =
  DESCRIPTION_PREFIX + 'el Identificador del Usuario' + DESCRIPTION_SUFFIX;
const REWARD_ID_FIELD =
  DESCRIPTION_PREFIX +
  'el Identificador de la tabla Recompensa' +
  DESCRIPTION_SUFFIX;
const POINTS_SPENT_FIELD =
  DESCRIPTION_PREFIX + 'los Puntos Gastados' + DESCRIPTION_SUFFIX;

export class UpdateSwapDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: USER_ID_FIELD,
    required: true,
  })
  usuario_id?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: REWARD_ID_FIELD,
    required: true,
  })
  recompensa_id?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: POINTS_SPENT_FIELD,
    required: true,
  })
  puntos_gastados?: number;
}
