import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SpecieFilmRepository } from 'src/species/domain/repository/specie-films.repository';
import { SpeciePeopleRepository } from 'src/species/domain/repository/specie-people.repository';
import { SpecieRepository } from 'src/species/domain/repository/specie.repository';
import { CreateSpecieDto } from '../dto/create-specie.dto';
import { IResponse } from 'src/common/intefaces/response.interface';
import { Specie } from 'src/species/domain/models/specie.model';

export class CreateSpecieUseCase {
  constructor(
    private readonly speciesRepo: SpecieRepository,
    private readonly speciePeopleRepo: SpeciePeopleRepository,
    private readonly specieFilmsRepo: SpecieFilmRepository,
  ) {}

  async exec(data: CreateSpecieDto): Promise<IResponse<Specie>> {
    const response = new ResponseHelper();

    const createdSpecie = await this.speciesRepo.create({
      altura_promedio: data.altura_promedio,
      promedio_de_vida: data.promedio_de_vida,
      clasificacion: data.clasificacion,
      creado: new Date(),
      designacion: data.designacion,
      editado: new Date(),
      colores_de_ojos: data.colores_de_ojos,
      colores_de_cabello: data.colores_de_cabello,
      mundo_natal: data.mundo_natal,
      idioma: data.idioma,
      nombre: data.nombre,
      colores_de_piel: data.colores_de_piel,
      url: data.url,
    });

    data.personas.forEach(async (item) => {
      await this.speciePeopleRepo.create({
        url: item,
        especie: createdSpecie,
      });
    });

    data.peliculas.forEach(async (item) => {
      await this.specieFilmsRepo.create({
        url: item,
        especie: createdSpecie,
      });
    });

    const speciesDBHandler = {
      ...createdSpecie,
      personas: data.personas,
      peliculas: data.peliculas,
    };

    response.result(speciesDBHandler);
    return response.resolve();
  }
}
