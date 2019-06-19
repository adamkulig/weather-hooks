import React, { useState } from 'react';
import { isEmpty, map } from 'lodash';
import { Container, Row } from 'reactstrap';

import { format } from 'date-fns'

import useInterval from './hooks/useInterval'
import useFetchData from './hooks/useFetchData';
import CityCard from './components/CityCard';
import SearchForm from './features/SearchForm';

const App = () => {
  const [date, setDate] = useState('')
  const { data, isLoading, isError, fetchNewCity } = useFetchData();
  const getDate = () => setDate(format(new Date(), 'MM/DD/YYYY HH:mm:ss'));
  useInterval(() => {
    getDate()
  }, 1000)

  const onRefresh = id => fetchNewCity(id)

  return (
    <Container className="App text-center py-5">
      <h1>Weather</h1>
      <h4>{date}</h4>
      <SearchForm />
      {isLoading ? <div>loading...</div> : <div><br /></div>}
      {isError && <div>Something went wrong ...</div>}
      <Row noGutters>
        {!isEmpty(data) && (
          map(data, city => (
            <CityCard key={city.id} city={city} onRefresh={() => onRefresh(city.id)}/>
          ))
        )}
      </Row>
    </Container>
  );
}

export default App;
