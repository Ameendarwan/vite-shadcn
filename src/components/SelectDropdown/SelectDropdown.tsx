import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@app/components/DropdownMenu/DropdownMenu';
import React, { FC, useState } from 'react';

interface SelectDropdownProps {
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  containerClassName?: string;
  triggerClassName?: string;
  arrowClassName?: string;
  arrowColor?: string;
  textColor?: string;
  disabled?: boolean;
  dataTestId?: string;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  selectedValue,
  options,
  containerClassName,
  triggerClassName,

  textColor,
  onSelect,
  disabled,
  dataTestId,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={`flex ${containerClassName} !m-0 w-full`} data-testid={dataTestId}>
      <DropdownMenu open={showOptions} onOpenChange={setShowOptions} data-testid={`${dataTestId}-menu`}>
        <DropdownMenuTrigger className="w-full" disabled={disabled} data-testid={`${dataTestId}-trigger`}>
          <div
            className={`flex min-h-[24px] w-full flex-row items-center justify-between gap-2 rounded-[3px] px-2 ${showOptions ? '!bg-blueShades-shade1' : 'bg-gray-100'} ${triggerClassName} ${disabled && '!bg-gray-200'}`}
            data-testid={`${dataTestId}-trigger-button`}>
            <span className={`text-xs font-bold capitalize ${textColor ? textColor : 'text-primary'} `}>
              {selectedValue}
            </span>
            {'>'}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`!z-[999] flex min-w-[130px] flex-col gap-2 rounded-lg border-none bg-white p-2 shadow-md`}
          data-testid={`${dataTestId}-dropdown`}>
          {options.map(option => (
            <DropdownMenuItem
              onClick={() => onSelect(option)}
              key={option}
              className={`${selectedValue?.toLowerCase() === option?.toLowerCase() && 'bg-blueShades-shade1'} cursor-pointer rounded-lg p-2 text-xss font-[800] uppercase hover:bg-blueShades-shade1`}
              data-testid={`${dataTestId}-option-${option.toLowerCase().replace(/\s+/g, '-')}`}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectDropdown;
