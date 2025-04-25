import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Recycling } from './entities/reciclaje.entity';
import { CreateRecyclingDto } from './dto/create-reciclaje.dto';
import { UpdateRecyclingDto } from './dto/update-reciclaje.dto';

const ENTITY = 'recycling';
const ENTITY_CAPITALIZED = 'Recycling';

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
export class RecyclingsService {
  constructor(
    @InjectRepository(Recycling)
    private readonly recyclingsRepository: Repository<Recycling>,
  ) {}

  async create(createRecyclingDto: CreateRecyclingDto): Promise<Recycling> {
    try {
      const recycling = this.recyclingsRepository.create(createRecyclingDto);
      return await this.recyclingsRepository.save(recycling);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Recycling[]> {
    try {
      return await this.recyclingsRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Recycling> {
    try {
      const recycling = await this.recyclingsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!recycling) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return recycling;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(id: number, updateRecyclingDto: UpdateRecyclingDto): Promise<Recycling> {
    try {
      const existing = await this.recyclingsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.recyclingsRepository.merge(existing, updateRecyclingDto);

      return await this.recyclingsRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Recycling> {
    try {
      const recycling = await this.recyclingsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!recycling) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      recycling.fecha_eliminación = new Date();

      return await this.recyclingsRepository.save(recycling);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
