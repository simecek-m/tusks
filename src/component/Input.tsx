import React, {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  LegacyRef,
} from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  type?: HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: FieldError;
}

const Input = (
  {
    name,
    onChange,
    onBlur,
    label,
    type = "text",
    defaultValue,
    disabled = false,
    className,
    error,
  }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
  return (
    <div className="my-2 flex w-full flex-col">
      {label && (
        <label
          htmlFor={name}
          className={` ${error ? `font-bold text-red-500` : ""} text-sm`}
        >
          {error?.message ?? label}
        </label>
      )}
      <input
        id={name}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${className} rounded-lg bg-gray-200 px-5 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50`}
      />
    </div>
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
