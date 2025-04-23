import { Module } from '@nestjs/common';
import { UsuarioRolesService } from './usuario-roles.service';
import { UsuarioRolesController } from './usuario-roles.controller';

@Module({
  controllers: [UsuarioRolesController],
  providers: [UsuarioRolesService],
})
export class UsuarioRolesModule {}
