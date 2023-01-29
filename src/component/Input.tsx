import { FC, HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  placeholder,
  type = "text",
  defaultValue,
  disabled = false,
  className,
}) => {
  return (
    <div className="my-2 flex flex-col">
      <p className="disabled">{placeholder}</p>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${className} rounded-lg bg-gray-200 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50`}
      />
    </div>
  );
};

export default Input;
