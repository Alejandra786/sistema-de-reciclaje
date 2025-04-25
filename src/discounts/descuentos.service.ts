import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateDiscountDto } from './dto/create-descuento.dto';
import { UpdateDiscountDto } from './dto/update-descuento.dto';
import { Discount } from './entities/descuento.entity';

const ENTITY = 'discount';
const ENTITY_CAPITALIZED = 'Discount';

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
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    try {
      const discount = this.discountsRepository.create({
        ...createDiscountDto,
        fecha_inicio: new Date(createDiscountDto.fecha_inicio),
        fecha_fin: new Date(createDiscountDto.fecha_fin),
      });

      return await this.discountsRepository.save(discount);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Discount[]> {
    try {
      return await this.discountsRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Discount> {
    try {
      const discount = await this.discountsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!discount) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return discount;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    try {
      const existing = await this.discountsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.discountsRepository.merge(existing, {
        ...updateDiscountDto,
        fecha_inicio: updateDiscountDto.fecha_inicio
          ? new Date(updateDiscountDto.fecha_inicio)
          : existing.fecha_inicio,
        fecha_fin: updateDiscountDto.fecha_fin
          ? new Date(updateDiscountDto.fecha_fin)
          : existing.fecha_fin,
      });

      return await this.discountsRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Discount> {
    try {
      const discount = await this.discountsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!discount) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      discount.fecha_eliminación = new Date();

      return await this.discountsRepository.save(discount);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
