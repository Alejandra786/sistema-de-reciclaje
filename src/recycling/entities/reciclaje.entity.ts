import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reciclajes' })
export class Recycling {
  @PrimaryGeneratedColumn({ name: 'reciclaje_id' })
  id: number;

  @Column({ name: 'usuario_id' })
  usuario_id: number;

  @Column({ name: 'punto_id' })
  punto_id: number;
  
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
