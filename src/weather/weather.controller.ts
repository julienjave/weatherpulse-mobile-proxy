import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service'; 

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('search')
  searchCity(@Query('q') q: string, @Query('limit') limit: string) {
    return this.weatherService.searchCity(q, limit);
  }

  @Get('reverse')
  reverseGeocode(@Query('lat') lat: string, @Query('lon') lon: string, @Query('limit') limit: string) {
    return this.weatherService.reverseGeocode(lat, lon, limit);
  }

  @Get('current')
  getCurrentWeather(@Query('lat') lat: string, @Query('lon') lon: string, @Query('units') units: string) {
    return this.weatherService.getCurrentWeather(lat, lon, units);
  }

  @Get('forecast')
  getForecast(@Query('lat') lat: string, @Query('lon') lon: string, @Query('units') units: string) {
    return this.weatherService.getForecast(lat, lon, units);
  }

  @Get('aqi')
  getAirQuality(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.weatherService.getAirQuality(lat, lon);
  }
}