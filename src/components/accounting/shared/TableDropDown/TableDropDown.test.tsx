import { render, screen, fireEvent } from '@testing-library/react';
import TableDropDown from './TableDropDown';


describe('TableDropDown Component', () => {
  const mockOptions = [
    { label: 'Option 1', action: jest.fn() },
    { label: 'Option 2', action: jest.fn() },
    { label: 'Option 3', action: jest.fn() },
  ];

  test('renders the correct number of options', () => {
    render(<TableDropDown options={mockOptions} />);
    
    const dropdownIcon = screen.getByTestId('dropdown-icon');
    fireEvent.click(dropdownIcon);
    
    const optionButtons = screen.getAllByRole('button');
    expect(optionButtons).toHaveLength(mockOptions.length);
  });

  test('calls the correct action when an option is clicked', () => {
    render(<TableDropDown options={mockOptions} />);
    
    const dropdownIcon = screen.getByTestId('dropdown-icon');
    fireEvent.click(dropdownIcon);
    
    const optionButton = screen.getByText('Option 1');
    fireEvent.click(optionButton);
    
    expect(mockOptions[0].action).toHaveBeenCalled();
  });

  test('popover does not render any options when options prop is not an array', () => {
    render(<TableDropDown options={null} />);
    
    const dropdownIcon = screen.getByTestId('dropdown-icon');
    fireEvent.click(dropdownIcon);
    
    // Check that no buttons (options) are rendered inside the popover
    const optionButtons = screen.queryAllByRole('button');
    expect(optionButtons.length).toBe(0); // There should be no buttons rendered
});
});
