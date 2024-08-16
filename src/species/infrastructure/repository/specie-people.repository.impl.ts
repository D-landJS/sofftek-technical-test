import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeciePeople } from 'src/species/domain/models/specie-people';
import { SpeciePeopleRepository } from 'src/species/domain/repository/specie-people.repository';
import { SpeciePeopleEntity } from '../entities/specie-people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesPeopleRepositoryImpl implements SpeciePeopleRepository {
  constructor(
    @InjectRepository(SpeciePeopleEntity)
    private speciePeopleRepo: Repository<SpeciePeopleEntity>,
  ) {}

  findAll(): Promise<SpeciePeople[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<SpeciePeople> {
    throw new Error('Method not implemented.');
  }
  async create(data: SpeciePeople): Promise<SpeciePeople> {
    try {
      const speciePeople: SpeciePeopleEntity =
        this.speciePeopleRepo.create(data);
      await this.speciePeopleRepo.manager.save(speciePeople);
      return speciePeople;
    } catch (err) {
      console.log(err);
    }
  }

  update(id: number, data: SpeciePeople): Promise<SpeciePeople> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<SpeciePeople> {
    throw new Error('Method not implemented.');
  }
}
