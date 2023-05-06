import { regularActions, regularReducer } from '../../redux/regularSlice';

describe('regularReducer', () => {
  describe('addTest', () => {
    const test1 = {
      _id: '6454f8599cdf2a9c4ed71780',
      string: 'aaa',
      pattern: '.*',
      result: true,
      createdAt: '2023-05-05T12:36:41.041Z',
    };

    test('with non-empty state', () => {
      expect(
        regularReducer(
          {
            results: [
              {
                _id: '6454f8599cdf2a9c4ed71234',
                string: 'aac',
                pattern: 'a*c',
                result: true,
                createdAt: '2023-05-05T12:36:41.041Z',
              },
            ],
          },
          regularActions.addTest(test1),
        ).results,
      ).toContain(test1);
    });

    test('with empty state', () => {
      expect(regularReducer({ results: [] }, regularActions.addTest(test))).toEqual({
        results: [test],
      });
    });
  });

  describe('setTests', () => {
    const tests = [
      {
        _id: '6454f8599cdf2a9c4ed71780',
        string: 'aaa',
        pattern: '.*',
        result: true,
        createdAt: '2023-05-05T12:36:41.041Z',
      },
      {
        _id: '6454f8599cdf2a9c4ed71234',
        string: 'aac',
        pattern: 'a*c',
        result: true,
        createdAt: '2023-05-05T12:36:41.041Z',
      },
    ];

    test('with non-empty state', () => {
      expect(
        regularReducer(
          {
            results: [
              {
                _id: '6454f8599cdf2a9c4ed71780',
                string: 'aaa',
                pattern: '.*',
                result: true,
                createdAt: '2023-05-05T12:36:41.041Z',
              },
            ],
          },
          regularActions.setTests(tests),
        ),
      ).toEqual({
        results: [...tests],
      });
    });

    test('with empty state', () => {
      expect(regularReducer(undefined, regularActions.setTests(tests))).toEqual({
        results: [...tests],
      });
    });
  });
});
