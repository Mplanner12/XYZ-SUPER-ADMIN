// Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...classes: any[]) => classes.filter(Boolean).join(' ')),
}));

describe('Button component', () => {
  it('renders with correct text', () => {
    render(<Button>Add test</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Add test');
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Add test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Add test</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});