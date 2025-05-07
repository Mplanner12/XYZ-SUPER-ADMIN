// TextField.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';
import { useForm, FormProvider } from 'react-hook-form';

// Mock the clsx function
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.join(' ')),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextField', () => {
  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <TestWrapper>
        <TextField name="test" onChange={onChange} />
      </TestWrapper>
    );
    await user.type(screen.getByRole('textbox'), 'test input');
    expect(onChange).toHaveBeenCalled();
  });
});