/*
 * Testing file for Menu.js
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders menu icon', () => {
    render(<App />);
    const menuElement = screen.getByTestId(/menu/i);
    expect(menuElement).toBeInTheDocument();
});
