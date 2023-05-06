import axios from 'axios';
import { createTest, getTests } from '../../api';

jest.mock('axios');

describe('getTests', () => {
  const data = {
    data: [
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
      {
        _id: '6454f8599cdf2a9c4ed78765',
        string: 'aaa',
        pattern: 'b*',
        result: false,
        createdAt: '2023-05-05T12:36:41.041Z',
      },
    ],
  };

  describe('when there is no server error', () => {
    beforeEach(() => {
      axios.get.mockReturnValue(data);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call axios get once', async () => {
      await getTests();
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`/tests`);
    });

    test('should return something', async () => {
      const response = await getTests();
      expect(response).not.toBeFalsy();
    });

    test('should return data', async () => {
      const response = await getTests();
      expect(response).toHaveProperty('data');
      expect(response.data).not.toBe(null);
      expect(response.data).toEqual(data.data);
    });

    test('should not return error', async () => {
      const response = await getTests();
      expect(response).toHaveProperty('error');
      expect(response.error).toBe(null);
    });

    test('should return data with length 3', async () => {
      const response = await getTests();
      expect(response.data).toHaveLength(3);
    });
  });

  describe('when there is server error', () => {
    beforeEach(() => {
      axios.get.mockRejectedValue(new Error('Internal server error'));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should not return data', async () => {
      const response = await getTests();
      expect(response).toHaveProperty('data');
      expect(response.data).toBe(null);
    });

    test('should return error', async () => {
      const response = await getTests();
      expect(response).toHaveProperty('error');
      expect(response.error).not.toBe(null);
    });
  });
});

describe('createTest', () => {
  test('should return something', async () => {
    const response = await createTest({
      string: 'aa',
      pattern: '.*',
    });
    expect(response).not.toBeFalsy();
  });

  test('should call axios post once', async () => {
    await createTest({
      string: 'aa',
      pattern: '.*',
    });
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`/tests`, {
      string: 'aa',
      pattern: '.*',
    });
  });

  describe('when request data is correct', () => {
    const request = {
      string: 'aa',
      pattern: '.*',
    };

    beforeEach(() => {
      const data = {
        data: {
          ...request,
          _id: '6454f8599cdf2a9c4ed71780',
          result: true,
          createdAt: '2023-05-05T12:36:41.041Z',
        },
      };

      axios.post.mockReturnValue(data);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should return data', async () => {
      const response = await createTest(request);
      expect(response).toHaveProperty('data');
      expect(response.data).not.toBe(null);
    });

    test('should not return error', async () => {
      const response = await createTest(request);
      expect(response).toHaveProperty('error');
      expect(response.error).toBe(null);
    });
  });

  describe('when request data is incorrect', () => {
    const request = {
      string: 'aa12',
      pattern: '.*',
    };

    beforeEach(() => {
      axios.post.mockRejectedValue(new Error('string contains only lowercase English letters'));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should not return data', async () => {
      const response = await createTest(request);
      expect(response).toHaveProperty('data');
      expect(response.data).toBe(null);
    });

    test('should return error', async () => {
      const response = await createTest(request);
      expect(response).toHaveProperty('error');
      expect(response.error).not.toBe(null);
    });

    test('should return correct error message', async () => {
      const response = await createTest(request);
      expect(response.error).toBe('string contains only lowercase English letters');
    });
  });
});
