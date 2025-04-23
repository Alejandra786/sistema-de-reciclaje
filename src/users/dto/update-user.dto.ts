import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

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

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    example: 'string',
    description: NAME_FIELD,
    maxLength: 150,
    required: true,
  })
  nombre: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    example: 'string',
    description: SURNAME_FIELD,
    maxLength: 150,
    required: true,
  })
  apellido: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    example: 'string',
    description: EMAIL_FIELD,
    maxLength: 100,
    required: true,
  })
  correo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    example: 'string',
    description: PASSWORD_FIELD,
    maxLength: 50,
    required: true,
  })
  contraseña?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  @ApiProperty({
    example: 'string',
    description: PHONE_FIELD,
    maxLength: 15,
  })
  telefono?: string;
}
