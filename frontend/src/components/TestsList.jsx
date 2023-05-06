import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTests } from '../api';
import { regularActions } from '../redux/regularSlice';

const TestsList = () => {
  const tests = useSelector((state) => state.regular.results);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      return await getTests();
    };

    fetchData().then((result) => {
      if (!result.error) {
        dispatch(regularActions.setTests(result.data));
      }
    });
  }, []);

  return (
    <div>
      <h2>Previous tests</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" data-testid="test-col">
              String
            </th>
            <th scope="col" data-testid="test-col">
              Pattern
            </th>
            <th scope="col" data-testid="test-col">
              Result
            </th>
            <th scope="col" data-testid="test-col">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {tests.length &&
            tests.map((test) => (
              <tr key={test._id} data-testid="test-row">
                <td>{test.string}</td>
                <td>{test.pattern}</td>
                <td>{test.result?.toString()}</td>
                <td>{test.createdAt?.split('T')[0]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestsList;
