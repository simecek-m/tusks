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
  prefix?: string;
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
    prefix,
    className,
    error,
  }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
  return (
    <label className="mt-2 flex w-full cursor-text flex-col">
      <span
        className={` ${error ? `font-bold text-red-500` : ""} ml-5 text-sm`}
      >
        {error?.message ?? label}
      </span>
      <span className="flex flex-row rounded-xl bg-gray-200 px-5 py-2 font-medium focus-within:outline">
        <p>{prefix}</p>
        <input
          id={name}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`${className} w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50`}
        />
      </span>
    </label>
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
