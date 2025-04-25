import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'puntos_reciclajes' })
export class RecyclingPoint {
  @PrimaryGeneratedColumn({ name: 'punto_id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: string;

  @Column({ name: 'ubicación' })
  ubicación: string;

  @Column({
    name: 'latitud',
    type: 'decimal',
    precision: 10,
    scale: 8,
  })
  latitud: number;

  @Column({
    name: 'longitud',
    type: 'decimal',
    precision: 10,
    scale: 8,
  })
  longitud: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
