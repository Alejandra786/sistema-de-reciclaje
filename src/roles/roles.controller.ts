import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly usersService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Registra un nuevo rol en el sistema' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateRoleDto })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.usersService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene la lista de todos los roles registrados',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un rol por su identificador único' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza la información de un rol existente' })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un rol del sistema' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
