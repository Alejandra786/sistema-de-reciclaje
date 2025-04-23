import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RecompensasModule } from './recompensas/recompensas.module';
import { DescuentosModule } from './descuentos/descuentos.module';
import { CanjesModule } from './canjes/canjes.module';
import { UsuarioRolesModule } from './usuario-roles/usuario-roles.module';
import { RolesModule } from './roles/roles.module';
import { ImpactosAmbientalesModule } from './impactos-ambientales/impactos-ambientales.module';
import { ListasMaterialesModule } from './listas-materiales/listas-materiales.module';
import { ReciclajesModule } from './reciclajes/reciclajes.module';
import { PuntajesModule } from './puntajes/puntajes.module';
import { DonacionesModule } from './donaciones/donaciones.module';
import { RecyclingPointsModule } from './puntos-reciclajes/puntos-reciclajes.module';
import { TiposMaterialesModule } from './tipos-materiales/tipos-materiales.module';
import { PuntoTiposMaterialesModule } from './punto-tipos-materiales/punto-tipos-materiales.module';

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
    RecompensasModule,
    DescuentosModule,
    CanjesModule,
    UsuarioRolesModule,
    RolesModule,
    ImpactosAmbientalesModule,
    ListasMaterialesModule,
    ReciclajesModule,
    PuntajesModule,
    DonacionesModule,
    RecyclingPointsModule,
    TiposMaterialesModule,
    PuntoTiposMaterialesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
