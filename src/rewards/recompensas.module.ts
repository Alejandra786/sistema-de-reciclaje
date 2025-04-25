import { Module } from '@nestjs/common';
import { RewardsService } from './recompensas.service';
import { RewardsController } from './recompensas.controller';
import { Reward } from './entities/recompensa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
