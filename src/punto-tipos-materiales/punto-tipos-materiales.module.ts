import { Module } from '@nestjs/common';
import { PuntoTiposMaterialesService } from './punto-tipos-materiales.service';
import { PuntoTiposMaterialesController } from './punto-tipos-materiales.controller';

@Module({
  controllers: [PuntoTiposMaterialesController],
  providers: [PuntoTiposMaterialesService],
})
export class PuntoTiposMaterialesModule {}
