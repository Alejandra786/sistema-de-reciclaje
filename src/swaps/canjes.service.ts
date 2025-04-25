import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Swap } from './entities/canje.entity';
import { CreateSwapDto } from './dto/create-canje.dto';
import { UpdateSwapDto } from './dto/update-canje.dto';

const ENTITY = 'swap';
const ENTITY_CAPITALIZED = 'Swap';

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
export class SwapsService {
  constructor(
    @InjectRepository(Swap)
    private readonly swapsRepository: Repository<Swap>,
  ) {}

  async create(createSwapDto: CreateSwapDto): Promise<Swap> {
    try {
      const swap = this.swapsRepository.create(createSwapDto);
      return await this.swapsRepository.save(swap);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Swap[]> {
    try {
      return await this.swapsRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Swap> {
    try {
      const swap = await this.swapsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!swap) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return swap;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(id: number, updateSwapDto: UpdateSwapDto): Promise<Swap> {
    try {
      const existing = await this.swapsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.swapsRepository.merge(existing, updateSwapDto);

      return await this.swapsRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Swap> {
    try {
      const swap = await this.swapsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!swap) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      swap.fecha_eliminación = new Date();

      return await this.swapsRepository.save(swap);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
