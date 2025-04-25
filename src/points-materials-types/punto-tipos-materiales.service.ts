import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { PointMaterialType } from './entities/punto-tipos-materiale.entity';
import { CreatePointMaterialTypeDto } from './dto/create-punto-tipos-materiale.dto';
import { UpdatePointMaterialTypeDto } from './dto/update-punto-tipos-materiale.dto';

const ENTITY = 'point material type';
const ENTITY_CAPITALIZED = 'Point material type';

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
export class PointMaterialTypesService {
  constructor(
    @InjectRepository(PointMaterialType)
    private readonly pointMaterialTypesRepository: Repository<PointMaterialType>,
  ) {}

  async create(dto: CreatePointMaterialTypeDto): Promise<PointMaterialType> {
    const pointMaterialType = this.pointMaterialTypesRepository.create(dto);
    return await this.pointMaterialTypesRepository.save(pointMaterialType);
  }

  async findAll(): Promise<PointMaterialType[]> {
    try {
      return await this.pointMaterialTypesRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch {
      throw new InternalServerErrorException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(
    punto_id: number,
    tipo_material_id: number,
  ): Promise<PointMaterialType> {
    try {
      const pointMaterialType = await this.pointMaterialTypesRepository.findOne(
        {
          where: { punto_id, tipo_material_id, fecha_eliminación: IsNull() },
        },
      );

      if (!pointMaterialType) throw new NotFoundException(ERRORS.NOT_FOUND);
      return pointMaterialType;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    punto_id: number,
    tipo_material_id: number,
    dto: UpdatePointMaterialTypeDto,
  ): Promise<PointMaterialType> {
    const existing = await this.pointMaterialTypesRepository.findOne({
      where: { punto_id, tipo_material_id, fecha_eliminación: IsNull() },
    });

    if (!existing) throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);

    try {
      const updated = this.pointMaterialTypesRepository.merge(existing, dto);
      return await this.pointMaterialTypesRepository.save(updated);
    } catch {
      throw new InternalServerErrorException(ERRORS.UPDATE);
    }
  }

  async remove(
    punto_id: number,
    tipo_material_id: number,
  ): Promise<PointMaterialType> {
    const pointMaterialType = await this.pointMaterialTypesRepository.findOne({
      where: { punto_id, tipo_material_id, fecha_eliminación: IsNull() },
    });

    if (!pointMaterialType)
      throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);

    try {
      pointMaterialType.fecha_eliminación = new Date();
      return await this.pointMaterialTypesRepository.save(pointMaterialType);
    } catch {
      throw new InternalServerErrorException(ERRORS.DELETE);
    }
  }
}
