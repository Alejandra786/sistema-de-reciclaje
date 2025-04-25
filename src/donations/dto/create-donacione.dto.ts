import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

const PREFIX = 'Campo utilizado para';
const DESCRIPTION_PREFIX = PREFIX + ' representar ';
const RELATION_PREFIX = PREFIX + ' relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla donaciones';
const USER_ID_FIELD =
  RELATION_PREFIX + 'el Identificador del Usuario' + DESCRIPTION_SUFFIX;
const AMOUNT_FIELD = DESCRIPTION_PREFIX + 'el Monto' + DESCRIPTION_SUFFIX;
const PAYMENT_METHOD_FIELD =
  DESCRIPTION_PREFIX + 'el Metodo de Pago' + DESCRIPTION_SUFFIX;

export class CreateDonationDto {
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
  @MaxLength(10)
  @ApiProperty({
    example: 0.0,
    description: AMOUNT_FIELD,
    maxLength: 10,
    required: true,
  })
  monto: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    example: '',
    description: PAYMENT_METHOD_FIELD,
    maxLength: 50,
    required: true,
  })
  metodo_pago: string;
}
