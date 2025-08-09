import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../src/lib/firebase');
import App from '../src/App';

test('renders header', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
