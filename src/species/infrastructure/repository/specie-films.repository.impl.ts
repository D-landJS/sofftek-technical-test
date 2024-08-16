import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SpecieFilmEntity } from '../entities/specie-films.entity';
import { SpecieFilmRepository } from 'src/species/domain/repository/specie-films.repository';
import { SpecieFilm } from 'src/species/domain/models/specie-film';

export class SpecieFilmsRepositoryImpl implements SpecieFilmRepository {
  constructor(
    @InjectRepository(SpecieFilmEntity)
    private specieFilmRepo: Repository<SpecieFilmEntity>,
    private dataSource: DataSource,
  ) {}
  findAll(): Promise<SpecieFilm[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<SpecieFilm> {
    throw new Error('Method not implemented.');
  }
  async create(data: SpecieFilm): Promise<SpecieFilm> {
    try {
      const specieFilm: SpecieFilmEntity = this.specieFilmRepo.create(data);
      await this.specieFilmRepo.manager.save(specieFilm);
      return specieFilm;
    } catch (err) {
      console.log(err);
    }
  }
  update(id: number, data: SpecieFilm): Promise<SpecieFilm> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<SpecieFilm> {
    throw new Error('Method not implemented.');
  }
}
