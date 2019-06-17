import React, { useState } from 'react';
import { isEmpty, map } from 'lodash';
import { Container, Row, Form, Input } from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import { format } from 'date-fns'

import useInterval from './hooks/useInterval'

import useFetchData from './hooks/useFetchData';
import CityCard from './components/CityCard';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [date, setDate] = useState('')
  const { data, isLoading, isError, fetchNewCity } = useFetchData();
  const getDate = () => setDate(format(new Date(), 'MM/DD/YYYY HH:mm:ss'));
  useInterval(() => {
    getDate()
  }, 1000)

  const onFormSubmit = async () => {
    if (!isEmpty(searchValue)) {
      await fetchNewCity(searchValue)
      setSearchValue('')
    }
  }

  const onRefresh = id => fetchNewCity(id)

  return (
    <Container className="App text-center py-5">
      <h1>Weather</h1>
      <h4>{date}</h4>
      <Form className='d-flex justify-content-center'>
        <Input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <div className='c-pointer px-1' onClick={onFormSubmit}><MdSearch size={32}/></div>
      </Form>
      {isLoading ? <div>loading...</div> : <div>...</div>}
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
