import { Entity, DeleteDateColumn, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'usuario_roles' })
export class UserRole {
  @PrimaryColumn({ name: 'usuario_id' })
  usuario_id: number;

  @PrimaryColumn({ name: 'rol_id' })
  rol_id: number;

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
