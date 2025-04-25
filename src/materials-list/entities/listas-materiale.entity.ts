import { Entity, DeleteDateColumn, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'puntos_tipos_materiales' })
export class MaterialList {
  @PrimaryColumn({ name: 'reciclaje_id' })
  reciclaje_id: number;

  @PrimaryColumn({ name: 'tipo_material_id' })
  tipo_material_id: number;

  @Column({ name: 'nombre_material' })
  nombre_material: string;

  @Column({
    name: 'cantidad_kg',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  cantidad_kg: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
