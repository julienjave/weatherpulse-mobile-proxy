import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly dataBaseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly geoBaseUrl = 'https://api.openweathermap.org/geo/1.0';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
  }

  private async forwardRequest(url: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error: any) { // Explicitly typed as any to resolve 'unknown' error
      throw new HttpException(
        error.response?.data || { message: 'External API error' },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchCity(q: string, limit: string = '5') {
    return this.forwardRequest(`${this.geoBaseUrl}/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${this.apiKey}`);
  }

  async reverseGeocode(lat: string, lon: string, limit: string = '1') {
    return this.forwardRequest(`${this.geoBaseUrl}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${this.apiKey}`);
  }

  async getCurrentWeather(lat: string, lon: string, units: string = 'metric') {
    return this.forwardRequest(`${this.dataBaseUrl}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.apiKey}`);
  }

  async getForecast(lat: string, lon: string, units: string = 'metric') {
    return this.forwardRequest(`${this.dataBaseUrl}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this.apiKey}`);
  }

  async getAirQuality(lat: string, lon: string) {
    return this.forwardRequest(`${this.dataBaseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }
}