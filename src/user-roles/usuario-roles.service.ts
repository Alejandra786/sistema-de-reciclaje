import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserRole } from './entities/usuario-role.entity';
import { CreateUserRoleDto } from './dto/create-usuario-role.dto';
import { UpdateUserRoleDto } from './dto/update-usuario-role.dto';

const ENTITY = 'user role';
const ENTITY_CAPITALIZED = 'User Role';

const ERRORS = {
  CREATE: `Failed to create ${ENTITY}.`,
  FETCH_ONE: `Failed to fetch ${ENTITY}.`,
  FETCH_ALL: `Failed to fetch ${ENTITY}s.`,
  UPDATE: `Failed to update ${ENTITY}.`,
  DELETE: `Failed to delete ${ENTITY}.`,
  NOT_FOUND: `${ENTITY_CAPITALIZED} not found.`,
  NOT_FOUND_OR_DELETED: `${ENTITY_CAPITALIZED} not found or already deleted.`,
};

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(dto: CreateUserRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(dto);
    return await this.userRoleRepository.save(userRole);
  }

  async findAll(): Promise<UserRole[]> {
    try {
      return await this.userRoleRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch {
      throw new InternalServerErrorException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(usuario_id: number, rol_id: number): Promise<UserRole> {
    try {
      const userRole = await this.userRoleRepository.findOne({
        where: { usuario_id, rol_id, fecha_eliminación: IsNull() },
      });

      if (!userRole) throw new NotFoundException(ERRORS.NOT_FOUND);
      return userRole;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    usuario_id: number,
    rol_id: number,
    dto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    const existing = await this.userRoleRepository.findOne({
      where: { usuario_id, rol_id, fecha_eliminación: IsNull() },
    });

    if (!existing) throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);

    try {
      const updated = this.userRoleRepository.merge(existing, dto);
      return await this.userRoleRepository.save(updated);
    } catch {
      throw new InternalServerErrorException(ERRORS.UPDATE);
    }
  }

  async remove(usuario_id: number, rol_id: number): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne({
      where: { usuario_id, rol_id, fecha_eliminación: IsNull() },
    });

    if (!userRole) throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);

    try {
      userRole.fecha_eliminación = new Date();
      return await this.userRoleRepository.save(userRole);
    } catch {
      throw new InternalServerErrorException(ERRORS.DELETE);
    }
  }
}
