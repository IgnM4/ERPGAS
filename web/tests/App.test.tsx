import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
jest.mock('../src/lib/firebase');
import App from '../src/App';

test('renders header', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
