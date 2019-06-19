import { useEffect, useState } from 'react';
// import { isString, isArray, isNumber, get } from 'lodash';

const useFormOperations = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isPristine, setPristine] = useState(true);
}

export default useFormOperations;
