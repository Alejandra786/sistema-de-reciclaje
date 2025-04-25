import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'recompensas' })
export class Reward {
  @PrimaryGeneratedColumn({ name: 'recompensa_id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'descripción' })
  descripcion: string;

  @Column({ name: 'puntos_necesarios' })
  puntos_necesarios: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
