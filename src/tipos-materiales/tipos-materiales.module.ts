import { Module } from '@nestjs/common';
import { TiposMaterialesService } from './tipos-materiales.service';
import { TiposMaterialesController } from './tipos-materiales.controller';

@Module({
  controllers: [TiposMaterialesController],
  providers: [TiposMaterialesService],
})
export class TiposMaterialesModule {}
