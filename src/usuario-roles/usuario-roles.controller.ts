import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioRolesService } from './usuario-roles.service';
import { CreateUsuarioRoleDto } from './dto/create-usuario-role.dto';
import { UpdateUsuarioRoleDto } from './dto/update-usuario-role.dto';

@Controller('usuario-roles')
export class UsuarioRolesController {
  constructor(private readonly usuarioRolesService: UsuarioRolesService) {}

  @Post()
  create(@Body() createUsuarioRoleDto: CreateUsuarioRoleDto) {
    return this.usuarioRolesService.create(createUsuarioRoleDto);
  }

  @Get()
  findAll() {
    return this.usuarioRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioRoleDto: UpdateUsuarioRoleDto) {
    return this.usuarioRolesService.update(+id, updateUsuarioRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioRolesService.remove(+id);
  }
}
