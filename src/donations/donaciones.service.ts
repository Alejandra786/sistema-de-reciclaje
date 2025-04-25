import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Donation } from './entities/donacione.entity';
import { CreateDonationDto } from './dto/create-donacione.dto';
import { UpdateDonationDto } from './dto/update-donacione.dto';

const ENTITY = 'donation';
const ENTITY_CAPITALIZED = 'Donation';

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
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    try {
      const donation = this.donationRepository.create(createDonationDto);
      return await this.donationRepository.save(donation);
    } catch (error) {
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<Donation[]> {
    try {
      return await this.donationRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<Donation> {
    try {
      const donation = await this.donationRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!donation) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return donation;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    try {
      const existing = await this.donationRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.donationRepository.merge(
        existing,
        updateDonationDto,
      );

      return await this.donationRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<Donation> {
    try {
      const donation = await this.donationRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!donation) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      donation.fecha_eliminación = new Date();

      return await this.donationRepository.save(donation);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
