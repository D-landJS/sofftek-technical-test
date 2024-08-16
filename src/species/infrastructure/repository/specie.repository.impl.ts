import { Injectable } from '@nestjs/common';
import { SpecieRepository } from '../../domain/repository/specie.repository';
import { SpecieSWResponseInterface } from '../../domain/interfaces/specie-sw-response.interface';
import { Specie } from '../../domain/models/specie.model';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecieEntity } from '../entities/specie.entities';
import { DataSource, Repository } from 'typeorm';
import { BASE_URL } from 'src/common/constants/config';
import { HttpCustomService } from 'src/common/providers/http/external-api.service';

@Injectable()
export class SpeciesRepositoryImpl implements SpecieRepository {
  private baseUrl: string;

  constructor(
    @InjectRepository(SpecieEntity)
    private speciesRepo: Repository<SpecieEntity>,
    private readonly httpService: HttpCustomService,
    private dataSource: DataSource,
  ) {
    this.baseUrl = BASE_URL;
  }
  getFromSW(): Promise<SpecieSWResponseInterface> {
    return this.httpService.get<SpecieSWResponseInterface>(
      `${this.baseUrl}species`,
    );
  }
  findAll(): Promise<Specie[]> {
    return this.speciesRepo
      .createQueryBuilder('species')
      .leftJoinAndSelect('species.personas', 'persona')
      .leftJoinAndSelect('species.peliculas', 'persona')
      .getMany();
  }
  findById(id: number): Promise<Specie> {
    throw new Error('Method not implemented.');
  }

  async create(data: Specie): Promise<Specie> {
    try {
      const specie: SpecieEntity = this.speciesRepo.create(data);
      await this.speciesRepo.manager.save(specie);
      return specie;
    } catch (err) {
      console.log(err);
    }
  }

  update(id: number, data: Specie): Promise<Specie> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<Specie> {
    throw new Error('Method not implemented.');
  }
}
