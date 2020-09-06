import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Todos', () => {
  const { getByText } = render(<App />);
  const appHeadingElement = getByText(/Todos/i);
  expect(appHeadingElement).toBeInTheDocument();
});
