import { useEffect, useState } from 'react';
import { map } from 'lodash';

const useFormOperations = (initialValues = {}, validate, submitCallback) => {
  let initialPristineState = {};
  map(initialValues, (value, key) => {
    initialPristineState[key] = true
  })

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isPristine, setPristine] = useState(initialPristineState);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleFocus = e => {
    setPristine({
      ...isPristine,
      [e.target.name]: false
    })
  } 

  const handleBlur = e => {
    setErrors(validate(values))
  } 

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values))
    setSubmitting(true)
  }

  useEffect(() => {
    // console.log('errors', errors)
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('submit', values)
        setSubmitting(false)
      } else {
        setSubmitting(false)
      } 
    }
  }, [errors])
  // console.log('values', values)
  // console.log('errors', errors)
  // console.log('isPristine', isPristine)
  console.log('isSubmitting', isSubmitting)
  return { handleChange, handleSubmit, handleFocus, handleBlur, values, errors, isPristine, isSubmitting }
}

export default useFormOperations;
