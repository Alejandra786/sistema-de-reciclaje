import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tipos_materiales' })
export class MaterialType {
  @PrimaryGeneratedColumn({ name: 'tipo_material_id' })
  id: number;

  @Column({ name: 'categoria' })
  categoria: string;

  @Column({
    name: 'puntos_kg',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  puntos_kg: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
