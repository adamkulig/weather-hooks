import axios from 'axios';

import { API_KEY } from '../config/api.config';

export const getCurrentWeatherByCityName = async cityName => {
  try {
    const response = axios.get(`api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}