import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'recompensas' })
export class Discount {
  @PrimaryGeneratedColumn({ name: 'recompensa_id' })
  id: number;

  @Column({ name: 'recompensa_id' })
  recompensa_id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({
    name: 'porcentaje_descuento',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  porcentaje_descuento: number;

  @Column({ name: 'fecha_inicio' })
  fecha_inicio: Date;

  @Column({ name: 'fecha_fin' })
  fecha_fin: Date;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
