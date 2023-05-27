import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTests } from '../api';
import { regularActions } from '../redux/regularSlice';

const TestsList = () => {
  const tests = useSelector((state) => state.regular.results);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getTests();
      setLoading(false);
      return res;
    };

    fetchData().then((result) => {
      if (!result.error) {
        dispatch(regularActions.setTests(result.data));
      }
    });
  }, []);

  return (
    <div>
      <h2 id="table-title">Previous tests</h2>
      {loading ? (
        <div id="loading-message">Loading...</div>
      ) : (
        <table className="table" data-testid="table">
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
          {tests.length && (
            <tbody>
              {tests.map((test) => (
                <tr key={test._id} className="test-row" data-testid="test-row">
                  <td>{test.string}</td>
                  <td>{test.pattern}</td>
                  <td>{test.result?.toString()}</td>
                  <td>
                    <time>{test.createdAt.split('T')[0]}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default TestsList;
