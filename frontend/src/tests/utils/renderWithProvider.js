import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../redux/store';

export const renderWithProviders = (component, initState = {}) => {
  const store = createReduxStore(initState);

  return render(<Provider store={store}>{component}</Provider>);
};
