import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRolesService } from './usuario-roles.service';
import { CreateUserRoleDto } from './dto/create-usuario-role.dto';
import { UpdateUserRoleDto } from './dto/update-usuario-role.dto';

@ApiTags('user-roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva relación usuario-rol en el sistema',
  })
  @ApiResponse({ status: 201, description: 'Usuario Rol creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateUserRoleDto })
  create(@Body() dto: CreateUserRoleDto) {
    return this.userRolesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene la lista de todos los usuarios roles registrados',
  })
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':usuario_id/:rol_id')
  @ApiOperation({
    summary: 'Obtiene un usuario rol por usuario_id y rol_id',
  })
  @ApiParam({ name: 'usuario_id', type: 'string' })
  @ApiParam({ name: 'rol_id', type: 'string' })
  findOne(
    @Param('usuario_id') usuario_id: number,
    @Param('rol_id') rol_id: number,
  ) {
    return this.userRolesService.findOne(usuario_id, rol_id);
  }

  @Patch(':usuario_id/:rol_id')
  @ApiOperation({
    summary: 'Actualiza un usuario rol existente por usuario_id y rol_id',
  })
  @ApiParam({ name: 'usuario_id', type: 'string' })
  @ApiParam({ name: 'rol_id', type: 'string' })
  update(
    @Param('usuario_id') usuario_id: number,
    @Param('rol_id') rol_id: number,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.userRolesService.update(usuario_id, rol_id, dto);
  }

  @Delete(':usuario_id/:rol_id')
  @ApiOperation({
    summary: 'Elimina lógicamente una relación usuario-rol',
  })
  @ApiParam({ name: 'usuario_id', type: 'string' })
  @ApiParam({ name: 'rol_id', type: 'string' })
  remove(
    @Param('usuario_id') usuario_id: number,
    @Param('rol_id') rol_id: number,
  ) {
    return this.userRolesService.remove(usuario_id, rol_id);
  }
}
