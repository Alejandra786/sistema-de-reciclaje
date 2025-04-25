import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateRewardDto } from './dto/create-recompensa.dto';
import { Reward } from './entities/recompensa.entity';
import { UpdateRewardDto } from './dto/update-recompensa.dto';

const ENTITY = 'reward';
const ENTITY_CAPITALIZED = 'Reward';

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
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardsRepository: Repository<Reward>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    try {
      const reward = this.rewardsRepository.create(createRewardDto);
      return await this.rewardsRepository.save(reward);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Reward[]> {
    try {
      return await this.rewardsRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Reward> {
    try {
      const reward = await this.rewardsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!reward) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return reward;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(id: number, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    try {
      const existing = await this.rewardsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.rewardsRepository.merge(existing, updateRewardDto);

      return await this.rewardsRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Reward> {
    try {
      const reward = await this.rewardsRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!reward) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      reward.fecha_eliminación = new Date();

      return await this.rewardsRepository.save(reward);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
