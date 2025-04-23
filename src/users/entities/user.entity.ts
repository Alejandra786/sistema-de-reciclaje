import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  id: number;

  @Column({ name: 'nombre_completo' })
  nombre_completo: string;

  @Column({ name: 'correo', unique: true })
  correo: string;

  @Column({ name: 'contraseña_hash' })
  contraseña_hash: string;

  @Column({ name: 'salt' })
  salt: string;

  @Column({ name: 'teléfono' })
  telefono: string;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
