import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const PREFIX = 'Campo utilizado para';
const DESCRIPTION_PREFIX = PREFIX + ' representar ';
const RELATION_PREFIX = PREFIX + ' relacionar ';
const DESCRIPTION_SUFFIX = ' en la tabla lista de materiales';

const RECYCLING_POINT_ID_FIELD =
  RELATION_PREFIX +
  'un ID válido de un Punto de Reciclaje' +
  DESCRIPTION_SUFFIX;
const MATERIAL_TYPE_ID_FIELD =
  RELATION_PREFIX +
  'el Identificador deL Tipo de Material' +
  DESCRIPTION_SUFFIX;
const NAME_FIELD =
  DESCRIPTION_PREFIX + 'el Nombre del Material' + DESCRIPTION_SUFFIX;
const AMOUNT_KG_FIELD =
  DESCRIPTION_PREFIX + 'la Cantidad en Kilogramos' + DESCRIPTION_SUFFIX;

export class UpdateMaterialListDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: RECYCLING_POINT_ID_FIELD,
    required: true,
  })
  reciclaje_id: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: MATERIAL_TYPE_ID_FIELD,
    required: true,
  })
  tipo_material_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: '',
    description: NAME_FIELD,
    maxLength: 100,
    required: true,
  })
  nombre_material: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: 0.0,
    description: AMOUNT_KG_FIELD,
    maxLength: 10,
    required: true,
  })
  cantidad_kg: number;
}
