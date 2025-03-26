import { render, screen } from '@testing-library/react';
import App from './App';

test('renders creator name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Created by Gary Simwawa/i);
  expect(nameElement).toBeInTheDocument();
});

