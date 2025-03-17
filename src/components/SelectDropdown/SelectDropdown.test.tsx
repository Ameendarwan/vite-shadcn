import { expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import SelectDropdown from './SelectDropdown';

describe('SelectDropdown', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const selectedValue = 'Option 1';
  const onSelectMock = vi.fn();

  it('renders correctly with given props', () => {
    render(
      <SelectDropdown
        selectedValue={selectedValue}
        options={options}
        onSelect={onSelectMock}
        dataTestId="select-dropdown"
      />
    );

    expect(screen.getByText(selectedValue)).toBeInTheDocument();
    expect(screen.getByTestId('select-dropdown-trigger-button')).toBeInTheDocument();
    expect(screen.queryByTestId('select-dropdown-dropdown')).not.toBeInTheDocument();
  });

  it('does not open the dropdown if disabled is true', () => {
    render(
      <SelectDropdown
        selectedValue={selectedValue}
        options={options}
        onSelect={onSelectMock}
        disabled
        dataTestId="select-dropdown"
      />
    );

    fireEvent.click(screen.getByTestId('select-dropdown-trigger-button'));
    expect(screen.queryByTestId('select-dropdown-dropdown')).not.toBeInTheDocument();
  });

  it('displays selected value in the trigger button', () => {
    render(
      <SelectDropdown selectedValue="Option 2" options={options} onSelect={onSelectMock} dataTestId="select-dropdown" />
    );
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
