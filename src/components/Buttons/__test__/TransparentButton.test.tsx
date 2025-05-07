import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TransparentButton from '../TransparentButton';

describe('TransparentButton component', () => {
  it('renders with the correct text', () => {
    render(<TransparentButton text="Click me" customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies the custom padding class', () => {
    render(<TransparentButton text="Padding Test" customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2');
  });

  it('has the correct initial styles', () => {
    render(<TransparentButton text="Styled Button" customPadding="px-4 py-2" />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-foundation-purple-purple-400');
    expect(button).toHaveClass('text-foundation-purple-purple-400');
  });

  it('changes styles on hover', () => {
    render(<TransparentButton text="Hover Test" customPadding="px-4 py-2" />);
    const button = screen.getByRole('button');

    // Trigger hover
    userEvent.hover(button);

    expect(button).toHaveClass('hover:text-white');
    expect(button).toHaveClass('hover:bg-foundation-purple-purple-100');
    expect(button).toHaveClass('hover:border-0');
  });

  it('renders correctly when text is null', () => {
    render(<TransparentButton text={null} customPadding="px-4 py-2" />);
    expect(screen.getByRole('button')).toBeEmptyDOMElement();
  });
});
