import { Module } from '@nestjs/common';
import { ListasMaterialesService } from './listas-materiales.service';
import { ListasMaterialesController } from './listas-materiales.controller';

@Module({
  controllers: [ListasMaterialesController],
  providers: [ListasMaterialesService],
})
export class ListasMaterialesModule {}
