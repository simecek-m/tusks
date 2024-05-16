import clsx from "clsx";
import React, { HTMLProps, LegacyRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
  prefix?: string;
}

const Input = (
  { label, prefix, error, ...rest }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
  return (
    <label className="mt-2 flex w-full cursor-text flex-col gap-1">
      <span
        className={clsx("text-sm", {
          "font-bold text-red-500 dark:text-red-300": !!error,
        })}
      >
        {error?.message ?? label}
      </span>
      <span
        className={clsx(
          "flex flex-row rounded-xl bg-gray-200 px-5 py-2 font-medium focus-within:outline dark:bg-gray-800",
          { "border-2 border-red-500 dark:border-red-300": !!error }
        )}
      >
        {!!prefix && <p>{prefix}</p>}
        <input
          ref={ref}
          {...rest}
          className="w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </span>
    </label>
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
