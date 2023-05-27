import { yupResolver } from '@hookform/resolvers/yup';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createTest } from '../api';
import { regularActions } from '../redux/regularSlice';

const validationSchema = Yup.object({
  string: Yup.string('Enter value with string type')
    .trim()
    .min(1, 'Enter at least 1 character')
    .max(20, 'Enter not more than 20 characters')
    .matches(/^[a-z]*$/, `String can consist of only lowercase english lettes`)
    .required('Field is required'),
  pattern: Yup.string()
    .trim()
    .min(1, 'Enter at least 1 character')
    .max(20, 'Enter not more than 20 characters')
    .matches(
      /^[a-z.*]*$/,
      `Pattern can consist of only lowercase english lettes and symbols '.', '*'`,
    )
    .required('Field is required'),
});

const Form = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      string: '',
      pattern: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    const result = await createTest(values);

    if (!result.error) {
      dispatch(regularActions.addTest(result.data));
      setError(null);
      reset();
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      <h1 id="form-title">Input data</h1>
      <form onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
        <div className="form-group">
          <label htmlFor="string">String</label>
          <input
            id="string"
            name="string"
            aria-label="string"
            type="text"
            {...register('string')}
            className={`form-control ${errors.string ? 'is-invalid' : ''}`}
          />
          {errors.string && (
            <div className="invalid-feedback" data-testid="validation">
              {errors.string.message}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="pattern">Pattern</label>
          <input
            id="pattern"
            name="pattern"
            aria-label="pattern"
            type="text"
            {...register('pattern')}
            className={`form-control ${errors.pattern ? 'is-invalid' : ''}`}
          />
          {errors.pattern && (
            <div className="invalid-feedback" data-testid="validation">
              {errors.pattern.message}
            </div>
          )}
        </div>

        {error && (
          <div className="text-danger" id="error-message">
            {error}
          </div>
        )}

        <Button variant="primary" type="submit" className="mt-3" data-testid="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
