import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, test, expect } from 'vitest';
vi.mock('../src/lib/firebase');
import App from '../src/App';

test('renders header', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
