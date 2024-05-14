import clsx from "clsx";
import { FC } from "react";

interface TodoProps {
  isCompleted: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

export const TodoPreview: FC<TodoProps> = ({
  isCompleted,
  label,
  onChange,
}) => {
  return (
    <label className="block w-fit cursor-pointer select-none text-lg">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onChange(!isCompleted)}
      />
      <span className={clsx("ml-2", { "line-through": isCompleted })}>
        {label}
      </span>
    </label>
  );
};
