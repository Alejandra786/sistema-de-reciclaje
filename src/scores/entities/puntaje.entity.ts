import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'puntajes' })
export class Score {
  @PrimaryGeneratedColumn({ name: 'puntaje_id' })
  id: number;

  @Column({ name: 'usuario_id' })
  usuario_id: number;

  @Column({ name: 'puntos_gastados' })
  puntos_gastados: number;

  @Column({ name: 'puntos_ganados' })
  puntos_ganados: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
