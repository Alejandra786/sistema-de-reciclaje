import { Entity, DeleteDateColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'puntos_tipos_materiales' })
export class PointMaterialType {
  @PrimaryColumn({ name: 'punto_id' })
  punto_id: number;

  @PrimaryColumn({ name: 'tipo_material_id' })
  tipo_material_id: number;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    default: null,
    name: 'fecha_eliminacion',
  })
  fecha_eliminación: Date | null;
}
