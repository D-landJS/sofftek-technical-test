import { SpecieRepository } from 'src/species/domain/repository/specie.repository';
import { SpeciePeopleRepository } from 'src/species/domain/repository/specie-people.repository';

import { SpecieFilmRepository } from 'src/species/domain/repository/specie-films.repository';
import { IResponse } from 'src/common/intefaces/response.interface';
import { Specie } from 'src/species/domain/models/specie.model';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SpecieSW } from 'src/species/domain/models/specie-sw.model';
import { TranslateHelper } from 'src/common/helpers/translation.helper';
import { SpeciePeople } from 'src/species/domain/models/specie-people';
import { SpecieFilm } from 'src/species/domain/models/specie-film';

export class GetSpeciesUseCase {
  constructor(
    private readonly speciesRepo: SpecieRepository,
    private readonly speciePeopleRepo: SpeciePeopleRepository,
    private readonly specieFilmRepos: SpecieFilmRepository,
  ) {}

  async exec(): Promise<IResponse<Specie[]>> {
    const res = new ResponseHelper();
    let speciesDB: Specie[] = [];

    speciesDB = await this.speciesRepo.findAll();

    if (speciesDB.length === 0) {
      const speciesfromSW = await this.speciesRepo.getFromSW();
      if (speciesfromSW.results.length !== 0) {
        speciesfromSW.results.forEach(async (item: SpecieSW) => {
          const newSpecie = await this.speciesRepo.create({
            altura_promedio: item.average_height,
            promedio_de_vida: item.average_lifespan,
            clasificacion: item.classification,
            creado: item.created,
            designacion: item.designation,
            editado: item.edited,
            colores_de_ojos: item.eye_colors,
            colores_de_cabello: item.hair_colors,
            mundo_natal: item.homeworld,
            idioma: item.language,
            nombre: item.name,
            colores_de_piel: item.skin_colors,
            url: item.url,
          });

          item.people.forEach((person) => {
            this.speciePeopleRepo.create({
              url: person,
              especie: newSpecie,
            });
          });

          item.films.forEach((film) => {
            this.specieFilmRepos.create({
              url: film,
              especie: newSpecie,
            });
          });
        });
      }

      res.result(TranslateHelper.translateProperty(speciesfromSW.results));
      return res.resolve();
    }

    const speciesDBHandler = speciesDB.map((specie: Specie) => {
      return {
        ...specie,
        personas: specie.personas.map((persona: SpeciePeople) => persona.url),
        peliculas: specie.peliculas.map((pelicula: SpecieFilm) => pelicula.url),
      };
    });

    res.result(speciesDBHandler);
    return res.resolve();
  }
}
