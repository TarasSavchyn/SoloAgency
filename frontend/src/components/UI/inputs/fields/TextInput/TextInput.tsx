import { InputHTMLAttributes, FC, memo } from 'react';
import classNames from 'classnames';
import { InputError, Label } from '../../elements';
import './text-input.scss';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  error: string | undefined;
  isRequired?: boolean;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

export const TextInput: FC<TextInputProps> = memo(
  ({ className, label, register, error, isRequired, ...props }) => {
    return (
      <div className={classNames('text-input', className)}>
        <Label label={label} isRequired={isRequired} />

        <input
          id={label}
          className={classNames('text-input__field', {
            'text-input__field--error': !!error,
          })}
          type="text"
          {...register}
          {...props}
        />

        {error && <InputError errorMessage={error} />}
      </div>
    );
  },
);
