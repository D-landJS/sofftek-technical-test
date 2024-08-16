import { Body, Controller, Get, Post } from '@nestjs/common';

import { SpeciesRepositoryImpl } from '../repository/specie.repository.impl';
import { SpeciesPeopleRepositoryImpl } from '../repository/specie-people.repository.impl';
import { SpecieFilmsRepositoryImpl } from '../repository/specie-films.repository.impl';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Specie } from 'src/species/domain/models/specie.model';
import { IResponse } from 'src/common/intefaces/response.interface';
import { GetSpeciesUseCase } from 'src/species/application/usecases/get-species.usecase';
import { GetSpeciesFromSWUseCase } from 'src/species/application/usecases/get-species-from-sw.usecase';
import { CreateSpecieUseCase } from 'src/species/application/usecases/create-specie.usecase';
import { CreateSpecieDto } from 'src/species/application/dto/create-specie.dto';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(
    private readonly speciesRepo: SpeciesRepositoryImpl,
    private readonly speciePeopleRepo: SpeciesPeopleRepositoryImpl,
    private readonly specieFilmsRepo: SpecieFilmsRepositoryImpl,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Recuperar especies',
    description: `Este servicio devuelve distintos tipos de seres o personajes del Universo Star Wars. 
            Si no se encuentran registros en la base de datos durante la primera consulta, el servicio consultará la API de 
            SWAPI para obtener los datos, los cuales se registrarán antes de ser devueltos.`,
  })
  @ApiResponse({ status: 200, description: 'OK', type: Specie })
  @ApiResponse({ status: 400, description: 'Bad request' })
  get(): Promise<IResponse<Specie[]>> {
    return new GetSpeciesUseCase(
      this.speciesRepo,
      this.speciePeopleRepo,
      this.specieFilmsRepo,
    ).exec();
  }

  @Get('/swapi')
  @ApiOperation({
    summary: 'Obtener especies desde la API de Swapi',
    description: `Este servicio devuelve distintos tipos de seres o personajes del Universo Star Wars obtenidos desde la API de Swapi.`,
  })
  @ApiResponse({ status: 200, description: 'OK', type: Specie })
  @ApiResponse({ status: 400, description: 'Bad request' })
  getFromSwapi(): Promise<IResponse<Specie[]>> {
    return new GetSpeciesFromSWUseCase(this.speciesRepo).exec();
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar una nueva especie',
    description: `Servicio utilizado para añadir una especie nueva al registro.`,
  })
  @ApiResponse({ status: 200, description: 'OK', type: Specie })
  @ApiResponse({ status: 201, description: 'Created', type: Specie })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createSpecieDto: CreateSpecieDto): Promise<IResponse<Specie>> {
    return new CreateSpecieUseCase(
      this.speciesRepo,
      this.speciePeopleRepo,
      this.specieFilmsRepo,
    ).exec(createSpecieDto);
  }
}
