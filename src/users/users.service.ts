import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const ENTITY = 'user';
const ENTITY_CAPITALIZED = 'User';

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
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { correo: createUserDto.correo },
      });

      if (existingUser) {
        throw new NotFoundException('Correo ya está registrado.');
      }

      const full_name = createUserDto.nombre + ' ' + createUserDto.apellido;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.contraseña, salt);

      const user = this.userRepository.create({
        nombre_completo: full_name,
        correo: createUserDto.correo,
        telefono: createUserDto.telefono,
        contraseña_hash: hashedPassword,
        salt: salt,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(ERRORS.CREATE);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ALL);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERRORS.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(ERRORS.FETCH_ONE);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existing = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }

      const updated = this.userRepository.merge(existing, updateUserDto);

      return await this.userRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERRORS.UPDATE);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERRORS.NOT_FOUND_OR_DELETED);
      }
      user.fecha_eliminación = new Date();

      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(ERRORS.DELETE);
    }
  }
}
