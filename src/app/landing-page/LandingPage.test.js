import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Landing page', () => {
  render(<App />);
  const mainPageElement = screen.getByText(/Main Page/i);
    expect(mainPageElement).toBeInTheDocument();
});
