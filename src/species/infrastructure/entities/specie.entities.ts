import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SpeciePeopleEntity } from './specie-people.entity';
import { SpecieFilmEntity } from './specie-films.entity';

@Entity('species')
export class SpecieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  clasificacion: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  designacion: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  altura_promedio: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  colores_de_piel: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  colores_de_cabello: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  colores_de_ojos: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  promedio_de_vida: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  mundo_natal: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  idioma: string;

  @Column({
    type: 'datetime',
  })
  creado: Date;

  @Column({
    type: 'datetime',
  })
  editado: Date;

  @Column({
    type: 'varchar',
  })
  url: string;

  @OneToMany(() => SpeciePeopleEntity, (persona) => persona.especie)
  personas: SpeciePeopleEntity[];

  @OneToMany(() => SpecieFilmEntity, (pelicula) => pelicula.especie)
  peliculas: SpecieFilmEntity[];
}
