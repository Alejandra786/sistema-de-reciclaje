import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

const ENTITY_NAME = 'role';
const CAPITALIZED_ENTITY_NAME =
  ENTITY_NAME.charAt(0).toUpperCase() + ENTITY_NAME.slice(1);
const ERROR_PREFIX = 'Failed to ';
const ERROR_CREATE_ROLE = ERROR_PREFIX + 'create ' + ENTITY_NAME;
const ERROR_FETCH_ROLES = ERROR_PREFIX + 'fetch ' + ENTITY_NAME + 's';
const ERROR_ROLE_NOT_FOUND = CAPITALIZED_ENTITY_NAME + ' not found';
const ERROR_FETCH_ROLE = ERROR_PREFIX + 'fetch ' + ENTITY_NAME;
const ERROR_UPDATE_ROLE = ERROR_PREFIX + 'update ' + ENTITY_NAME;
const ERROR_DELETE_ROLE = ERROR_PREFIX + 'delete ' + ENTITY_NAME;
const ERROR_ROLE_NOT_FOUND_OR_DELETED =
  ERROR_ROLE_NOT_FOUND + ' or already deleted';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new NotFoundException(ERROR_CREATE_ROLE);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find({
        where: { fecha_eliminacion: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_ROLES);
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id, fecha_eliminacion: IsNull() },
      });

      if (!role) {
        throw new NotFoundException(ERROR_ROLE_NOT_FOUND);
      }
      return role;
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_ROLE);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      const existing = await this.roleRepository.findOne({
        where: { id, fecha_eliminacion: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERROR_ROLE_NOT_FOUND_OR_DELETED);
      }

      const updated = this.roleRepository.merge(existing, updateRoleDto);

      return await this.roleRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERROR_UPDATE_ROLE);
    }
  }

  async remove(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id, fecha_eliminacion: IsNull() },
      });

      if (!role) {
        throw new NotFoundException(ERROR_ROLE_NOT_FOUND_OR_DELETED);
      }
      role.fecha_eliminacion = new Date();

      return await this.roleRepository.save(role);
    } catch (error) {
      throw new NotFoundException(ERROR_DELETE_ROLE);
    }
  }
}
