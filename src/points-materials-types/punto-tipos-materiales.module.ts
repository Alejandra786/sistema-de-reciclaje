import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointMaterialTypesService } from './punto-tipos-materiales.service';
import { PointMaterialType } from './entities/punto-tipos-materiale.entity';
import { PointMaterialTypesController } from './punto-tipos-materiales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PointMaterialType])],
  controllers: [PointMaterialTypesController],
  providers: [PointMaterialTypesService],
})
export class PointMaterialTypesControllersModule {}
