import { BaseRepository } from 'src/common/repository/base.repository';
import { Specie } from '../models/specie.model';
import { SpecieSWResponseInterface } from '../interfaces/specie-sw-response.interface';

export interface SpecieRepository extends BaseRepository<Specie> {
  getFromSW(): Promise<SpecieSWResponseInterface>;
}
