import { cn } from "helper/style";
import { forwardRef, HTMLProps, LegacyRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
  prefix?: string;
  className?: string;
}

export const Input = forwardRef(
  (
    { label, prefix, error, className, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement>,
  ) => {
    return (
      <label className="flex w-full cursor-text flex-col gap-1">
        {!!label && (
          <span
            className={cn("text-sm", {
              "font-bold text-red-500 dark:text-red-300": !!error,
            })}
          >
            {error?.message ?? label}
          </span>
        )}
        <span
          className={cn(
            "flex flex-row rounded-xl bg-gray-200 px-5 py-2 font-medium focus-within:outline dark:bg-gray-800",
            { "border-4 border-red-500 dark:border-red-300": !!error },
            className,
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
  },
);

Input.displayName = "Input";
