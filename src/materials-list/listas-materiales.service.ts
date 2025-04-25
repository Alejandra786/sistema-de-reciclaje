import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { MaterialList } from './entities/listas-materiale.entity';
import { CreateMaterialListDto } from './dto/create-listas-materiale.dto';
import { UpdateMaterialListDto } from './dto/update-listas-materiale.dto';

const ENTITY = 'material list';
const ENTITY_CAPITALIZED = 'Material List';

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
export class MaterialListsService {
  constructor(
    @InjectRepository(MaterialList)
    private readonly userRoleRepository: Repository<MaterialList>,
  ) {}

  async create(dto: CreateMaterialListDto): Promise<MaterialList> {
    const userRole = this.userRoleRepository.create(dto);
    return await this.userRoleRepository.save(userRole);
  }

  async findAll(): Promise<MaterialList[]> {
    try {
      return await this.userRoleRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch {
      throw new InternalServerErrorException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(
    reciclaje_id: number,
    tipo_material_id: number,
  ): Promise<MaterialList> {
    try {
      const userRole = await this.userRoleRepository.findOne({
        where: { reciclaje_id, tipo_material_id, fecha_eliminación: IsNull() },
      });

      if (!userRole) throw new NotFoundException(ERRORS.NOT_FOUND);
      return userRole;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    reciclaje_id: number,
    tipo_material_id: number,
    dto: UpdateMaterialListDto,
  ): Promise<MaterialList> {
    const existing = await this.userRoleRepository.findOne({
      where: { reciclaje_id, tipo_material_id, fecha_eliminación: IsNull() },
    });

    if (!existing) throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);

    try {
      const updated = this.userRoleRepository.merge(existing, dto);
      return await this.userRoleRepository.save(updated);
    } catch {
      throw new InternalServerErrorException(ERRORS.UPDATE);
    }
  }

  async remove(
    reciclaje_id: number,
    tipo_material_id: number,
  ): Promise<MaterialList> {
    const userRole = await this.userRoleRepository.findOne({
      where: { reciclaje_id, tipo_material_id, fecha_eliminación: IsNull() },
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
