import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'impactos_ambientales' })
export class EnvironmentalImpact {
  @PrimaryGeneratedColumn({ name: 'impacto_id' })
  id: number;

  @Column({ name: 'reciclaje_id' })
  reciclaje_id: number;

  @Column({
    name: 'kg_reciclados',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  kg_reciclados: number;

  @Column({
    name: 'CO2_reducidos',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  CO2_reducidos: number;

  @Column({
    name: 'fecha',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
