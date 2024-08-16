import { ApiProperty } from '@nestjs/swagger';
import { SpeciePeople } from './specie-people';
import { SpecieFilm } from './specie-film';

export class Specie {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  clasificacion: string;

  @ApiProperty()
  altura_promedio: string;

  @ApiProperty()
  colores_de_piel: string;

  @ApiProperty()
  colores_de_cabello: string;

  @ApiProperty()
  colores_de_ojos: string;

  @ApiProperty()
  promedio_de_vida: string;

  @ApiProperty()
  designacion: string;

  @ApiProperty()
  creado: Date;

  @ApiProperty()
  editado: Date;

  @ApiProperty()
  mundo_natal: string;

  @ApiProperty()
  idioma: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  personas?: SpeciePeople[];

  @ApiProperty()
  peliculas?: SpecieFilm[];
}
