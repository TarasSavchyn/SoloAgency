import { useState } from 'react';
import classNames from 'classnames';
import Select, { OnChangeValue } from 'react-select';
import { SelectOption } from '../../../../../types/SelectOption';
import { SelectType } from '../../../../../types/SelectType';
import { useLoadOptions } from '../../../../../customHooks/useLoadOptions';
import { InputError, Label } from '../../elements';
import './dropdown.scss';

type Props = {
  label: string;
  placeholder: string;
  value: number | undefined;
  onChange: (value: number) => void;
  error: string | undefined;
  isRequired?: boolean;
  isSearchable?: boolean;
  selectType: SelectType;
};

export const Dropdown: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  isRequired,
  isSearchable = false,
  selectType,
}) => {
  const { isLoadingOptions, options } = useLoadOptions(selectType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const handleChange = (
    selectedOption: OnChangeValue<SelectOption<number>, false>,
  ) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      onChange(selectedValue);
    }
  };

  const getValue = (newValue: number | undefined) => {
    return options?.find(option => option.value === newValue) || null;
  };

  const noOptionsMessage = ({ inputValue }: { inputValue: string }) =>
    inputValue ? 'Нічого не знайдено' : 'Виберіть опцію';

  return (
    <div className="dropdown">
      <Label label={label} isRequired={isRequired} />

      <Select
        inputId={label}
        isSearchable={isSearchable}
        isLoading={isLoadingOptions}
        options={options}
        noOptionsMessage={noOptionsMessage}
        defaultInputValue={undefined}
        value={getValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        menuIsOpen={isMenuOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onFocus={onMenuOpen}
        className={classNames({ 'dropdown__container--has-error': !!error })}
        classNamePrefix="dropdown"
        blurInputOnSelect
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
