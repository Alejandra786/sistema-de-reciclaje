import { Module } from '@nestjs/common';
import { ScoresService } from './puntajes.service';
import { ScoresController } from './puntajes.controller';
import { Score } from './entities/puntaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
