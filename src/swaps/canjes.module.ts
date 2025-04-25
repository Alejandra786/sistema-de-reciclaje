import { Module } from '@nestjs/common';
import { SwapsController } from './canjes.controller';
import { Swap } from './entities/canje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwapsService } from './canjes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Swap])],
  controllers: [SwapsController],
  providers: [SwapsService],
})
export class SwapsModule {}
