import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

const PREFIX = 'Campo utilizado para';
const DESCRIPTION_PREFIX = PREFIX + ' representar ';
const RELATION_PREFIX = PREFIX + ' relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla puntajes';
const USER_ID_FIELD =
  RELATION_PREFIX + 'el Identificador del Usuario' + DESCRIPTION_SUFFIX;
const POINTS_SPENT_FIELD =
  DESCRIPTION_PREFIX + 'los Puntos Gastados' + DESCRIPTION_SUFFIX;
const POINTS_EARNED_FIELD =
  DESCRIPTION_PREFIX + 'los Puntos Ganados' + DESCRIPTION_SUFFIX;

export class CreateScoreDto {
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
    description: POINTS_SPENT_FIELD,
    required: true,
  })
  puntos_gastados: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: POINTS_EARNED_FIELD,
    required: true,
  })
  puntos_ganados: number;
}
