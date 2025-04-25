import { Module } from '@nestjs/common';
import { EnvironmentalImpactsService } from './impactos-ambientales.service';
import { EnvironmentalImpactsController } from './impactos-ambientales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalImpact } from './entities/impactos-ambientale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnvironmentalImpact])],
  controllers: [EnvironmentalImpactsController],
  providers: [EnvironmentalImpactsService],
})
export class EnvironmentalImpactsModule {}
