import { ResponseHelper } from 'src/common/helpers/response.helper';
import { TranslateHelper } from 'src/common/helpers/translation.helper';
import { IResponse } from 'src/common/intefaces/response.interface';
import { Specie } from 'src/species/domain/models/specie.model';
import { SpecieRepository } from 'src/species/domain/repository/specie.repository';

export class GetSpeciesFromSWUseCase {
  constructor(private readonly speciesReposo: SpecieRepository) {}

  async exec(): Promise<IResponse<Specie[]>> {
    const response = new ResponseHelper();

    const speciesFromSwapi = await this.speciesReposo.getFromSW();

    response.result(
      TranslateHelper.translateProperty(speciesFromSwapi.results),
    );
    return response.resolve();
  }
}
