import { Module } from '@nestjs/common';
import { SpeciesController } from '../controller/species.controller';
import { SpeciesRepositoryImpl } from '../repository/specie.repository.impl';
import { ProvidersModule } from 'src/common/providers/providers.module';
import { HttpCustomService } from 'src/common/providers/http/external-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecieEntity } from '../entities/specie.entities';
import { SpeciePeopleEntity } from '../entities/specie-people.entity';
import { SpecieFilmEntity } from '../entities/specie-films.entity';
import { SpeciesPeopleRepositoryImpl } from '../repository/specie-people.repository.impl';
import { SpecieFilmsRepositoryImpl } from '../repository/specie-films.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecieEntity,
      SpeciePeopleEntity,
      SpecieFilmEntity,
    ]),
    ProvidersModule,
  ],
  controllers: [SpeciesController],
  providers: [
    HttpCustomService,
    SpeciesRepositoryImpl,
    SpeciesPeopleRepositoryImpl,
    SpecieFilmsRepositoryImpl,
  ],
})
export class SpeciesModule {}
