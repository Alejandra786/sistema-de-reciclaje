import { Module } from '@nestjs/common';
import { ReciclajesService } from './reciclajes.service';
import { ReciclajesController } from './reciclajes.controller';

@Module({
  controllers: [ReciclajesController],
  providers: [ReciclajesService],
})
export class ReciclajesModule {}
