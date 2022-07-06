import { render, screen } from '@testing-library/react';
import App from './App';

test('renders strava activities heading', () => {
  render(<App />);
  const stravaText = screen.getByText(/Last Strava activities/i);
  expect(stravaText).toBeInTheDocument();
});
