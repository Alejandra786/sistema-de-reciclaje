import { Module } from '@nestjs/common';
import { CanjesService } from './canjes.service';
import { CanjesController } from './canjes.controller';

@Module({
  controllers: [CanjesController],
  providers: [CanjesService],
})
export class CanjesModule {}
