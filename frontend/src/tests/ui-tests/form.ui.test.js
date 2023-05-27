import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Form from '../../components/Form';
import { renderWithProviders } from '../utils/renderWithProvider';

describe('Form ui', () => {
  test('should render the title', () => {
    renderWithProviders(<Form />);
    const headingElement = screen.getByText(/Input data/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('should render the labels', () => {
    renderWithProviders(<Form />);
    expect(screen.getByLabelText('String')).toBeInTheDocument();
    expect(screen.getByLabelText('Pattern')).toBeInTheDocument();
  });

  test('should render the basic fields', () => {
    renderWithProviders(<Form />);
    expect(screen.getByText(/Input data/i)).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /string/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /pattern/i })).toBeInTheDocument();
  });

  test('should render the button', () => {
    renderWithProviders(<Form />);
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).not.toBeDisabled();
  });

  test('when empty fields should display correct validation message', async () => {
    renderWithProviders(<Form />);
    const button = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Enter at least 1 character')).toHaveLength(2);
    });
  });

  test('when inputs are incorrect should display correct validation message', async () => {
    renderWithProviders(<Form />);
    const button = screen.getByTestId('submit');
    const inputString = screen.getByLabelText('String');
    const inputPattern = screen.getByLabelText('Pattern');

    await act(async () => {
      fireEvent.change(inputString, { target: { value: '123' } });
      fireEvent.change(inputPattern, { target: { value: 'aa' } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('validation')).toHaveLength(1);
    });
  });
});
