import { Module } from '@nestjs/common';
import { DonationsService } from './donaciones.service';
import { DonationsController } from './donaciones.controller';
import { Donation } from './entities/donacione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
