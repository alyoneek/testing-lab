import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import TestsList from '../../components/TestsList';

const mockStore = {
  regular: {
    results: [
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
  },
};

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Tests list ui', () => {
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the title', () => {
    render(<TestsList />);
    const headingElement = screen.getByText(/Previous tests/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('should render table', async () => {
    render(<TestsList />);
    const columns = await screen.findAllByTestId('test-col');
    expect(columns.length).toBe(4);
  });

  test('should render list of tests', async () => {
    render(<TestsList />);
    const users = await screen.findAllByTestId('test-row');
    expect(users.length).toBe(3);
  });
});
