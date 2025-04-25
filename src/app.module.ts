import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/recompensas.module';
import { SwapsModule } from './swaps/canjes.module';
import { UserRolesModule } from './user-roles/usuario-roles.module';
import { RolesModule } from './roles/roles.module';
import { EnvironmentalImpactsModule } from './environmental-impacts/impactos-ambientales.module';
import { MaterialListsControllersModule } from './materials-list/listas-materiales.module';
import { RecyclingModule } from './recycling/reciclajes.module';
import { ScoresModule } from './scores/puntajes.module';
import { DonationsModule } from './donations/donaciones.module';
import { RecyclingPointsModule } from './recycling-points/puntos-reciclajes.module';
import { MaterialTypesModule } from './materials-types/tipos-materiales.module';
import { PointMaterialTypesControllersModule } from './points-materials-types/punto-tipos-materiales.module';
import { DiscountModule } from './discounts/descuentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: `${process.env.DB_TYPE}` as 'mysql' | 'mariadb',
      host: `${process.env.DB_HOST}`,
      username: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASS}`,
      database: `${process.env.DB_NAME}`,
      port: parseInt(`${process.env.DB_PORT}`),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    RewardsModule,
    SwapsModule,
    UserRolesModule,
    RolesModule,
    EnvironmentalImpactsModule,
    MaterialListsControllersModule,
    RecyclingModule,
    ScoresModule,
    DonationsModule,
    RecyclingPointsModule,
    MaterialTypesModule,
    PointMaterialTypesControllersModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
