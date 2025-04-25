import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { RecyclingPoint } from './entities/puntos-reciclaje.entity';
import { CreateRecyclingPointDto } from './dto/create-puntos-reciclaje.dto';
import { UpdateRecyclingPointDto } from './dto/update-puntos-reciclaje.dto';

const ENTITY_NAME = 'recycling point';
const CAPITALIZED_ENTITY_NAME =
  ENTITY_NAME.charAt(0).toUpperCase() + ENTITY_NAME.slice(1);
const ERROR_PREFIX = 'Failed to ';
const ERROR_CREATE_RECYLING_POINT = ERROR_PREFIX + 'create ' + ENTITY_NAME;
const ERROR_FETCH_RECYLING_POINTS =
  ERROR_PREFIX + 'fetch ' + +ENTITY_NAME + 's';
const ERROR_RECYLING_POINT_NOT_FOUND = CAPITALIZED_ENTITY_NAME + ' not found';
const ERROR_FETCH_RECYLING_POINT = ERROR_PREFIX + 'fetch ' + ENTITY_NAME;
const ERROR_UPDATE_RECYLING_POINT = ERROR_PREFIX + 'update ' + ENTITY_NAME;
const ERROR_DELETE_RECYLING_POINT = ERROR_PREFIX + 'delete ' + ENTITY_NAME;
const ERROR_RECYLING_POINT_NOT_FOUND_OR_DELETED =
  ERROR_RECYLING_POINT_NOT_FOUND + ' or already deleted';

@Injectable()
export class RecyclingPointsService {
  constructor(
    @InjectRepository(RecyclingPoint)
    private readonly recyclingPointRepository: Repository<RecyclingPoint>,
  ) {}

  async create(
    createRecyclingPointDto: CreateRecyclingPointDto,
  ): Promise<RecyclingPoint> {
    try {
      const recyclingPoint = this.recyclingPointRepository.create(
        createRecyclingPointDto,
      );
      return await this.recyclingPointRepository.save(recyclingPoint);
    } catch (error) {
      throw new NotFoundException(ERROR_CREATE_RECYLING_POINT);
    }
  }

  async findAll(): Promise<RecyclingPoint[]> {
    try {
      return await this.recyclingPointRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_RECYLING_POINTS);
    }
  }

  async findOne(id: number): Promise<RecyclingPoint> {
    try {
      const user = await this.recyclingPointRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERROR_RECYLING_POINT_NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_RECYLING_POINT);
    }
  }

  async update(
    id: number,
    updateRecyclingPointDto: UpdateRecyclingPointDto,
  ): Promise<RecyclingPoint> {
    try {
      const existing = await this.recyclingPointRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERROR_RECYLING_POINT_NOT_FOUND_OR_DELETED);
      }

      const updated = this.recyclingPointRepository.merge(
        existing,
        updateRecyclingPointDto,
      );

      return await this.recyclingPointRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERROR_UPDATE_RECYLING_POINT);
    }
  }

  async remove(id: number): Promise<RecyclingPoint> {
    try {
      const user = await this.recyclingPointRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERROR_RECYLING_POINT_NOT_FOUND_OR_DELETED);
      }
      user.fecha_eliminación = new Date();

      return await this.recyclingPointRepository.save(user);
    } catch (error) {
      throw new NotFoundException(ERROR_DELETE_RECYLING_POINT);
    }
  }
}
