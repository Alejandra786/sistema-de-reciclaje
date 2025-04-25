import { Entity, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'rol_id' })
  id: number;

  @Column({ name: 'nombre', unique: true })
  nombre: string;

  @Column({ name: 'descripción' })
  descripcion: string;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminacion: Date | null;
}
