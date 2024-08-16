import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpecieEntity } from './specie.entities';

@Entity('specie_films')
export class SpecieFilmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
  })
  url: string;

  @ManyToOne(() => SpecieEntity, (especie) => especie.personas)
  @JoinColumn({ name: 'especie_id' })
  especie: SpecieEntity;
}
