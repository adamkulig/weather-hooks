import { useEffect, useState } from 'react';
import axios from 'axios';
import { isString, isArray, isNumber, get } from 'lodash';
import { API_KEY } from '../config/api.config';

const initialStateCities = [/*Warsaw*/756135, /*London*/2643743];

const useFetchData = () => {
    const [citiesToFetch, setCitiesToFetch] = useState(initialStateCities);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const fetchNewCity = cityName => {
      setCitiesToFetch(cityName)
    }
    
    const getCurrentWeatherByCityName = async cityName => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`);
      return response.data;
    }

    const getCurrentWeatherById = async id => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${API_KEY}`);
      return response.data;
    }
    
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          if (isArray(citiesToFetch)) {
            await fetchMultipleCities(citiesToFetch)
          } else if (isString(citiesToFetch)) {
            await fetchSingleCity(citiesToFetch)
          } else if (isNumber(citiesToFetch)) {
            await refreshSingleCity(citiesToFetch)
          }
        } catch (e) {
          setIsError(true);
        }
        setIsLoading(false);
      }
      fetchData();
    }, [citiesToFetch]);
 
    const fetchSingleCity = async city => {
      const result = await getCurrentWeatherByCityName(city) 
      const desiredId = get(result, 'id');
      const cityExist = data.some(city => city.id === desiredId)
      !cityExist && setData([...data, result])
    }
    const refreshSingleCity = async id => {
      const result = await getCurrentWeatherById(id)
      const updatedData = data.map(city => city.id === id ? result : city)
      setData(updatedData)
    }

    const fetchMultipleCities = async cityNames => {
      const promises = cityNames.map(id => getCurrentWeatherById(id))
      const results = await Promise.all(promises)
      setData(results)
    }
    return { citiesToFetch, data, isLoading, isError, fetchNewCity }
  }
  
export default useFetchData;
