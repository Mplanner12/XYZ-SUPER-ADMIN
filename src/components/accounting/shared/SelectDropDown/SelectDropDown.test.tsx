import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectDropDown from './SelectDropDown';

describe('SelectDropDown Component', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnSelect = jest.fn();
  const mockOnToggle = jest.fn();

  const renderComponent = (isOpen: boolean = false) => {
    return render(
      <SelectDropDown
        label="Select an Option"
        options={mockOptions}
        onSelect={mockOnSelect}
        isOpen={isOpen}
        onToggle={mockOnToggle}
        textSize={16}
        menuWidth={10}
        zIndex={10}
      />
    );
  };

  test('toggles the dropdown when clicked', () => {
    renderComponent();
    const toggleElement = screen.getByText('Select an Option');

    // Simulate click to open
    fireEvent.click(toggleElement);
    expect(mockOnToggle).toHaveBeenCalled();
  });

  test('calls onSelect when an option is clicked', () => {
    renderComponent(true);
    const optionElement = screen.getByText('Option 1');

    fireEvent.click(optionElement);
    expect(mockOnSelect).toHaveBeenCalledWith('Option 1');
  });

  test('closes dropdown after an option is selected', () => {
    renderComponent(true);
    const optionElement = screen.getByText('Option 1');

    fireEvent.click(optionElement);
    expect(mockOnToggle).toHaveBeenCalled();
  });

  test('closes dropdown when clicked outside', () => {
    renderComponent(true);
    fireEvent.mouseDown(document);
    expect(mockOnToggle).toHaveBeenCalled();
  });
});