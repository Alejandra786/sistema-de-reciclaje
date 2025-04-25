import { Module } from '@nestjs/common';
import { MaterialTypesService } from './tipos-materiales.service';
import { MaterialTypesController } from './tipos-materiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialType } from './entities/tipos-materiale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialType])],
  controllers: [MaterialTypesController],
  providers: [MaterialTypesService],
})
export class MaterialTypesModule {}
