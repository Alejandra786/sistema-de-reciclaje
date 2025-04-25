import { Module } from '@nestjs/common';
import { RecyclingsService } from './reciclajes.service';
import { RecyclingsController } from './reciclajes.controller';
import { Recycling } from './entities/reciclaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recycling])],
  controllers: [RecyclingsController],
  providers: [RecyclingsService],
})
export class RecyclingModule {}
