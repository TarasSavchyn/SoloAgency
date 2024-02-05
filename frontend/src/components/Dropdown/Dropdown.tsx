import Select, { OnChangeValue } from 'react-select';
import { useState } from 'react';
import { SelectOption } from '../../types/SelectOption';
import { SelectType } from '../../types/SelectType';
import { useLoadOptions } from '../../customHooks/useLoadOptions';
import './dropdown.scss';

type DropdownProps = {
  label: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  error: string | undefined;
  isSearchable?: boolean;
  selectType: SelectType;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  isSearchable = false,
  selectType,
}) => {
  const { isLoadingOptions, options } = useLoadOptions(selectType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const handleChange = (selectedOption: OnChangeValue<SelectOption, false>) => {
    if (selectedOption) {
      const selectedValue = (selectedOption as SelectOption).value;
      onChange(selectedValue);
    }
  };

  const getValue = (newValue: number) => {
    return options?.find(option => option.value === newValue);
  };

  const noOptionsMessage = ({ inputValue }: { inputValue: string }) =>
    inputValue ? 'Нічого не знайдено' : 'Виберіть опцію';

  return (
    <div className="dropdown">
      <label className="dropdown__label" htmlFor={label}>
        {label}
      </label>

      <Select
        inputId={label}
        isSearchable={isSearchable}
        isLoading={isLoadingOptions}
        options={options}
        noOptionsMessage={noOptionsMessage}
        value={getValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        menuIsOpen={isMenuOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onFocus={onMenuOpen}
        classNamePrefix="dropdown"
        blurInputOnSelect
      />

      {error && (
        <p className="dropdown__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </div>
  );
};