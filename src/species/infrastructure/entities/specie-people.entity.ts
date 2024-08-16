import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SpecieEntity } from './specie.entities';

@Entity('specie_people')
export class SpeciePeopleEntity {
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
