import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/usuario-role.entity';
import { UserRolesController } from './usuario-roles.controller';
import { UserRolesService } from './usuario-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
