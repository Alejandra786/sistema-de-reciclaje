import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioRoleDto } from './create-usuario-role.dto';

export class UpdateUsuarioRoleDto extends PartialType(CreateUsuarioRoleDto) {}
