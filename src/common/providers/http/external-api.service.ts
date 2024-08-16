import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, params),
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
