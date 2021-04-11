import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading text', () => {
  render(<App />);
  const linkElement = screen.getByText(/loading operations/i);
  expect(linkElement).toBeInTheDocument();
});
