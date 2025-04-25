import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Score } from './entities/puntaje.entity';
import { UpdateScoreDto } from './dto/update-puntaje.dto';
import { CreateScoreDto } from './dto/create-puntaje.dto';

const ENTITY = 'score';
const ENTITY_CAPITALIZED = 'Score';

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
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoresRepository: Repository<Score>,
  ) {}

  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    try {
      const score = this.scoresRepository.create(createScoreDto);
      return await this.scoresRepository.save(score);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Score[]> {
    try {
      return await this.scoresRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Score> {
    try {
      const score = await this.scoresRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!score) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return score;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(id: number, updateScoreDto: UpdateScoreDto): Promise<Score> {
    try {
      const existing = await this.scoresRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.scoresRepository.merge(existing, updateScoreDto);

      return await this.scoresRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Score> {
    try {
      const score = await this.scoresRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!score) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      score.fecha_eliminación = new Date();

      return await this.scoresRepository.save(score);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
