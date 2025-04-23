import { Module } from '@nestjs/common';
import { ImpactosAmbientalesService } from './impactos-ambientales.service';
import { ImpactosAmbientalesController } from './impactos-ambientales.controller';

@Module({
  controllers: [ImpactosAmbientalesController],
  providers: [ImpactosAmbientalesService],
})
export class ImpactosAmbientalesModule {}
