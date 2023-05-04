import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createTest, getTests } from '../api';
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

const Regular = () => {
  const [error, setError] = useState(null);
  const tests = useSelector((state) => state.regular.results);
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

  useEffect(() => {
    const fetchData = async () => {
      return await getTests();
    };

    fetchData().then((result) => {
      if (!result.error) {
        dispatch(regularActions.addTests(result.data));
      }
    });
  }, []);

  console.log(error);

  const onSubmit = async (values) => {
    const result = await createTest(values);
    console.log(result);
    if (!result.error) {
      dispatch(regularActions.addTest(result.data));
      setError(null);
      reset();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="container-row">
      <form onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
        <div className="form-group">
          <label>String</label>
          <input
            name="string"
            type="text"
            {...register('string')}
            className={`form-control ${errors.string ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.string?.message}</div>
        </div>

        <div className="form-group">
          <label>Pattern</label>
          <input
            name="pattern"
            type="text"
            {...register('pattern')}
            className={`form-control ${errors.pattern ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.pattern?.message}</div>
        </div>

        {error && <div className="text-danger">{error}</div>}

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </form>

      <div>
        <h2>Previous tests</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">String</th>
              <th scope="col">Pattern</th>
              <th scope="col">Result</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {tests?.map((test) => (
              <tr>
                <td>{test.string}</td>
                <td>{test.pattern}</td>
                <td>{test.result?.toString()}</td>
                <td>{test.time?.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Regular;
