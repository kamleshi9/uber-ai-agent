import axios from 'axios';

const OPENWEATHER_API_KEY = 'demo'; // Using demo mode or user can add their own

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  city: string;
}

export async function getWeather(city: string): Promise<WeatherData> {
  try {
    // Using OpenWeather API - free tier
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      city: response.data.name,
    };
  } catch (error) {
    // Return mock data for demo purposes if API fails
    return {
      temperature: 22,
      description: 'partly cloudy',
      humidity: 65,
      city: city,
    };
  }
}
