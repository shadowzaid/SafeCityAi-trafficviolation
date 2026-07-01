import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import App from './App';

test('renders SafeCityAI brand', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getAllByText(/SafeCityAI/i).length).toBeGreaterThan(0);
});
