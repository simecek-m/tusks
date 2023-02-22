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
    <label className="mt-2 flex w-full cursor-text flex-col">
      <span
        className={clsx("ml-5 text-sm", {
          "`font-bold text-red-500`": !!error,
        })}
      >
        {error?.message ?? label}
      </span>
      <span className="flex flex-row rounded-xl bg-gray-200 px-5 py-2 font-medium focus-within:outline dark:bg-slate-700">
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
