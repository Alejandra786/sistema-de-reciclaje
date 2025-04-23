import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const ENTITY_NAME = 'user';
const CAPITALIZED_ENTITY_NAME =
  ENTITY_NAME.charAt(0).toUpperCase() + ENTITY_NAME.slice(1);
const ERROR_PREFIX = 'Failed to ';
const ERROR_CREATE_USER = ERROR_PREFIX + 'create ' + ENTITY_NAME;
const ERROR_FETCH_USERS = ERROR_PREFIX + 'fetch ' + +ENTITY_NAME + 's';
const ERROR_USER_NOT_FOUND = CAPITALIZED_ENTITY_NAME + ' not found';
const ERROR_FETCH_USER = ERROR_PREFIX + 'fetch ' + ENTITY_NAME;
const ERROR_UPDATE_USER = ERROR_PREFIX + 'update ' + ENTITY_NAME;
const ERROR_DELETE_USER = ERROR_PREFIX + 'delete ' + ENTITY_NAME;
const ERROR_USER_NOT_FOUND_OR_DELETED =
  ERROR_USER_NOT_FOUND + ' or already deleted';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
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
      throw new NotFoundException(ERROR_CREATE_USER);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { fecha_eliminación: IsNull() },
      });
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_USERS);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERROR_USER_NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(ERROR_FETCH_USER);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existing = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!existing) {
        throw new NotFoundException(ERROR_USER_NOT_FOUND_OR_DELETED);
      }

      const updated = this.userRepository.merge(existing, updateUserDto);

      return await this.userRepository.save(updated);
    } catch (error) {
      throw new NotFoundException(ERROR_UPDATE_USER);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, fecha_eliminación: IsNull() },
      });

      if (!user) {
        throw new NotFoundException(ERROR_USER_NOT_FOUND_OR_DELETED);
      }
      user.fecha_eliminación = new Date();

      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(ERROR_DELETE_USER);
    }
  }
}
