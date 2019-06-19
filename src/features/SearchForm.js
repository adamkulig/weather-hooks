import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import { isEmpty } from 'lodash';
import useFetchData from '../hooks/useFetchData';

const INITIAL_VALUES = {
  cityName: ''
}

const validate = values => {
  const errors = {};
  if (!values.cityName) {
    errors.cityName = 'Empty field'
  }
  //catch async error with 404 (wrong city name)
  return errors;
}

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const { fetchNewCity } = useFetchData();

  const onFormSubmit = async () => {
    if (!isEmpty(searchValue)) {
      await fetchNewCity(searchValue)
      setSearchValue('')
    }
  }

  return ( 
    <Form className='d-flex justify-content-center'>
      <Input
        type='text'
        name='cityName'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <div className='c-pointer px-1' onClick={onFormSubmit}><MdSearch size={32}/></div>
    </Form> 
  );
}
 
export default SearchForm;
