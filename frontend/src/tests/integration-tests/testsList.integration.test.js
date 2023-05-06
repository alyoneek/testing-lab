import * as api from '../../api';
import TestsList from '../../components/TestsList';
import { renderWithProviders } from '../utils/renderWithProvider';

describe('TestsList', () => {
  test('should call getTests', () => {
    const spy = jest.spyOn(api, 'getTests');
    renderWithProviders(<TestsList />);
    expect(spy).toBeCalledTimes(1);
  });
});
