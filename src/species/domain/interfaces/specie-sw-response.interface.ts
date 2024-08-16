import { SpecieSW } from '../models/specie-sw.model';

export interface SpecieSWResponseInterface {
  count: number;
  next: string;
  previous: null;
  results: SpecieSW[];
}
