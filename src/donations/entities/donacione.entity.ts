import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'donaciones' })
export class Donation {
  @PrimaryGeneratedColumn({ name: 'donación_id' })
  id: number;

  @Column({ name: 'usuario_id' })
  usuario_id: number;

  @Column({
    name: 'monto',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  monto: number;

  @Column({ name: 'metodo_pago' })
  metodo_pago: string;

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
