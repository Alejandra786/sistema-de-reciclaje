import { Injectable } from '@nestjs/common';
import { CreateUsuarioRoleDto } from './dto/create-usuario-role.dto';
import { UpdateUsuarioRoleDto } from './dto/update-usuario-role.dto';

@Injectable()
export class UsuarioRolesService {
  create(createUsuarioRoleDto: CreateUsuarioRoleDto) {
    return 'This action adds a new usuarioRole';
  }

  findAll() {
    return `This action returns all usuarioRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioRole`;
  }

  update(id: number, updateUsuarioRoleDto: UpdateUsuarioRoleDto) {
    return `This action updates a #${id} usuarioRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioRole`;
  }
}
