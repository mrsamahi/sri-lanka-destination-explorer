
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  async getWeather(latitude: number, longitude: number) {
    const url = new URL('https://api.open-meteo.com/v1/forecast');

    url.searchParams.set('latitude', String(latitude));
    url.searchParams.set('longitude', String(longitude));
    url.searchParams.set(
      'current',
      'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    );

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Unable to fetch weather information');
    }

    const data = await response.json();

    const weatherDescriptions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };

    return {
      temperature: data.current.temperature_2m,
      condition:
        weatherDescriptions[data.current.weather_code] ??
        'Unknown weather condition',
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      temperatureUnit: data.current_units.temperature_2m,
      humidityUnit: data.current_units.relative_humidity_2m,
      windSpeedUnit: data.current_units.wind_speed_10m,
    };
  }
}
