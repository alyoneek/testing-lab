import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as api from '../../api';
import Form from '../../components/Form';
import { renderWithProviders } from '../utils/renderWithProvider';

describe('Form', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(api, 'createTest');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when inputs correct', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call createTest with values', async () => {
      renderWithProviders(<Form stringLabel="String" patternLabel="Pattern" />);

      const inputString = screen.getByLabelText('String');
      const inputPattern = screen.getByLabelText('Pattern');

      await act(async () => {
        fireEvent.change(inputString, { target: { value: 'aa' } });
        fireEvent.change(inputPattern, { target: { value: 'aa' } });
        fireEvent.click(screen.getByTestId('submit'));
      });

      await waitFor(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ string: 'aa', pattern: 'aa' });
      });
    });
  });

  describe('when inputs incorrect', () => {
    test('should not call createTest', async () => {
      renderWithProviders(<Form />);

      const inputString = screen.getByRole('textbox', { name: /string/i });
      const inputPattern = screen.getByRole('textbox', { name: /pattern/i });

      await act(async () => {
        fireEvent.change(inputString, { target: { value: 'aa12' } });
        fireEvent.change(inputPattern, { target: { value: '' } });

        fireEvent.click(screen.getByTestId('submit'));
      });

      await waitFor(() => {
        expect(spy).toBeCalledTimes(0);
      });
    });
  });
});
