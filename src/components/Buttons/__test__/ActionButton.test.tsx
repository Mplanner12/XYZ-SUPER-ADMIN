import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ActionButton from '../ActionButton';


describe('ActionButton component', () => {
  it('renders with correct text', () => {
    render(<ActionButton text="Click Me" customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('applies custom padding', () => {
    render(<ActionButton text="Click Me" customPadding="px-8 py-4" />);
    expect(screen.getByRole('button')).toHaveClass('px-8 py-4');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<ActionButton text="Click Me" customPadding="px-4 py-2" onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with the correct action type', () => {
    render(<ActionButton text="Submit" customPadding="px-4 py-2" actionType="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders with the default action type when no actionType is provided', () => {
    render(<ActionButton text="Default" customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('renders with null text correctly', () => {
    render(<ActionButton text={null} customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toBeEmptyDOMElement();
  });
});
