import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { EnvironmentalImpact } from './entities/impactos-ambientale.entity';
import { CreateEnvironmentalImpactDto } from './dto/create-impactos-ambientale.dto';
import { UpdateEnvironmentalImpactDto } from './dto/update-impactos-ambientale.dto';

const ENTITY = 'environmental impact';
const ENTITY_CAPITALIZED = 'Environmental impact';

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
export class EnvironmentalImpactsService {
  constructor(
    @InjectRepository(EnvironmentalImpact)
    private readonly environmentalImpactRepository: Repository<EnvironmentalImpact>,
  ) {}

  async create(
    createEnvironmentalImpactDto: CreateEnvironmentalImpactDto,
  ): Promise<EnvironmentalImpact> {
    try {
      const environmentalImpact = this.environmentalImpactRepository.create(
        createEnvironmentalImpactDto,
      );
      return await this.environmentalImpactRepository.save(environmentalImpact);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<EnvironmentalImpact[]> {
    try {
      return await this.environmentalImpactRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<EnvironmentalImpact> {
    try {
      const environmentalImpact =
        await this.environmentalImpactRepository.findOne({
          where: { id, fecha_eliminación: IsNull() },
        });

      if (!environmentalImpact) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return environmentalImpact;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    id: number,
    updateEnvironmentalImpactDto: UpdateEnvironmentalImpactDto,
  ): Promise<EnvironmentalImpact> {
    try {
      const existing = await this.environmentalImpactRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.environmentalImpactRepository.merge(
        existing,
        updateEnvironmentalImpactDto,
      );

      return await this.environmentalImpactRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<EnvironmentalImpact> {
    try {
      const environmentalImpact =
        await this.environmentalImpactRepository.findOne({
          where: { id, fecha_eliminación: IsNull() },
        });

      if (!environmentalImpact) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      environmentalImpact.fecha_eliminación = new Date();

      return await this.environmentalImpactRepository.save(environmentalImpact);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
