import { Module } from '@nestjs/common';
import { DiscountsService } from './descuentos.service';
import { DiscountsController } from './descuentos.controller';
import { Discount } from './entities/descuento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountModule {}
