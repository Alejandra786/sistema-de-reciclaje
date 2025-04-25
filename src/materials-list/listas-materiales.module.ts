import { Module } from '@nestjs/common';
import { MaterialListsService } from './listas-materiales.service';
import { MaterialListsController } from './listas-materiales.controller';
import { MaterialList } from './entities/listas-materiale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialList])],
  controllers: [MaterialListsController],
  providers: [MaterialListsService],
})
export class MaterialListsControllersModule {}
