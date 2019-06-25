import React, { useState } from 'react';
import { Form, Input, FormGroup, FormFeedback } from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import { get, isNil } from 'lodash';
import useFetchData from '../hooks/useFetchData';
import useFormOperations from '../hooks/useFormOperations';

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
  // const [searchValue, setSearchValue] = useState('');
  const { fetchNewCity } = useFetchData();
  const { handleChange, handleSubmit, handleFocus, handleBlur, values, errors, isPristine, isSubmitting } = useFormOperations(INITIAL_VALUES, validate)

  // const onFormSubmit = async () => {
  //   if (!isEmpty(searchValue)) {
  //     await fetchNewCity(searchValue)
  //     setSearchValue('')
  //   }
  // }
  const isError = !isPristine.cityName && !isNil(errors.cityName)  && errors.cityName.length > 0

  return ( 
    <Form className='d-flex justify-content-center'>
      <FormGroup>
        <Input
          type='text'
          name='cityName'
          value={values.cityName}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          invalid={isError}
        />
        {isError && <FormFeedback>{errors.cityName}</FormFeedback>}
      </FormGroup>
      <div className='c-pointer px-1' onClick={handleSubmit}><MdSearch size={32}/></div>
    </Form> 
  );
}
 
export default SearchForm;
