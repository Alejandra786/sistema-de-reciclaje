import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecyclingPoint } from './entities/puntos-reciclaje.entity';
import { RecyclingPointsService } from './puntos-reciclajes.service';
import { RecyclingPointsController } from './puntos-reciclajes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecyclingPoint])],
  controllers: [RecyclingPointsController],
  providers: [RecyclingPointsService],
})
export class RecyclingPointsModule {}
