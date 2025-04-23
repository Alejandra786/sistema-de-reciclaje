import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

const DESCRIPTION_PREFIX = 'Campo que representa ';
const DESCRIPTION_SUFFIX = ' del usuario';
const UNIQUE_TEXT = ' (debe ser único en la base de datos)';
const NAME_FIELD =
  DESCRIPTION_PREFIX + 'el Nombre' + DESCRIPTION_SUFFIX;
const SURNAME_FIELD =
  DESCRIPTION_PREFIX + 'el Apellido' + DESCRIPTION_SUFFIX;
const EMAIL_FIELD =
  DESCRIPTION_PREFIX +
  'el Correo Electrónico' +
  DESCRIPTION_SUFFIX +
  UNIQUE_TEXT;
const PASSWORD_FIELD =
  DESCRIPTION_PREFIX + 'la Contraseña' + DESCRIPTION_SUFFIX;
const PHONE_FIELD =
  DESCRIPTION_PREFIX + 'el Número Teléfonico' + DESCRIPTION_SUFFIX;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    example: 'string',
    description: NAME_FIELD,
    maxLength: 30,
    required: true,
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    example: 'string',
    description: SURNAME_FIELD,
    maxLength: 30,
    required: true,
  })
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(60)
  @ApiProperty({
    example: 'string',
    description: EMAIL_FIELD,
    maxLength: 60,
    required: true,
  })
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    example: 'string',
    description: PASSWORD_FIELD,
    maxLength: 20,
    required: true,
  })
  contraseña: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    example: 'string',
    description: PHONE_FIELD,
    maxLength: 20,
  })
  telefono: string;
}
