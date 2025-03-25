import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeSelectDropDown from './TreeSelectDropDown';

describe('TreeSelectDropDown Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', children: [
      { label: 'Sub Option 1', value: 'subOption1' },
      { label: 'Sub Option 2', value: 'subOption2' },
    ]},
    { label: 'Option 3', value: 'option3' },
  ];

  const mockOnSelect = jest.fn();
  const mockOnToggle = jest.fn();

  const renderComponent = (isOpen: boolean = false) => {
    return render(
      <TreeSelectDropDown
        label="Select an Option"
        options={mockOptions}
        onSelect={mockOnSelect}
        isOpen={isOpen}
        onToggle={mockOnToggle}
        textSize={16}
        menuWidth={10}
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
    expect(mockOnSelect).toHaveBeenCalledWith('option1');
  });

  test('closes dropdown when clicked outside', () => {
    renderComponent(true);
    fireEvent.mouseDown(document);
    expect(mockOnToggle).toHaveBeenCalled();
  });
});