import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
// TATA ELXSI: Test for brand presence on the main screen.
test('renders TATA ELXSI brand in header', () => {
  render(<App />);
  const headerElement = screen.getByText(/TATA ELXSI/i);
  expect(headerElement).toBeInTheDocument();
});
