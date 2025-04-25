import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { MaterialType } from './entities/tipos-materiale.entity';
import { CreateMaterialTypeDto } from './dto/create-tipos-materiale.dto';
import { UpdateMaterialTypeDto } from './dto/update-tipos-materiale.dto';

const ENTITY = 'material type';
const ENTITY_CAPITALIZED = 'Material type';

const ERRORS = {
  CREATE: `Failed to create ${ENTITY}.`,
  FETCH_ALL: `Failed to fetch ${ENTITY}s.`,
  FETCH_ONE: `Failed to fetch ${ENTITY}.`,
  UPDATE: `Failed to update ${ENTITY}.`,
  DELETE: `Failed to delete ${ENTITY}.`,
  NOT_FOUND: `${ENTITY_CAPITALIZED} not found.`,
  NOT_FOUND_OR_DELETED: `${ENTITY_CAPITALIZED} not found or already deleted.`,
};

@Injectable()
export class MaterialTypesService {
  constructor(
    @InjectRepository(MaterialType)
    private readonly materialTypeRepository: Repository<MaterialType>,
  ) {}

  async create(
    createMaterialTypeDto: CreateMaterialTypeDto,
  ): Promise<MaterialType> {
    try {
      const materialType = this.materialTypeRepository.create(createMaterialTypeDto);
      return await this.materialTypeRepository.save(materialType);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<MaterialType[]> {
    try {
      return await this.materialTypeRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<MaterialType> {
    try {
      const materialType = await this.materialTypeRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!materialType) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return materialType;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    id: number,
    updateMaterialTypeDto: UpdateMaterialTypeDto,
  ): Promise<MaterialType> {
    try {
      const existing = await this.materialTypeRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.materialTypeRepository.merge(
        existing,
        updateMaterialTypeDto,
      );

      return await this.materialTypeRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<MaterialType> {
    try {
      const materialType = await this.materialTypeRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!materialType) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      materialType.fecha_eliminación = new Date();

      return await this.materialTypeRepository.save(materialType);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
