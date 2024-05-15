import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <span
      className="block w-fit cursor-pointer select-none text-lg"
      onClick={() => onChange(!isCompleted)}
    >
      {isCompleted ? (
        <FontAwesomeIcon
          icon={["fas", "circle-check"]}
          className="text-brand-light dark:text-brand-dark"
        />
      ) : (
        <FontAwesomeIcon icon={["far", "circle"]} />
      )}
      <span className={clsx("ml-2", { "line-through": isCompleted })}>
        {label}
      </span>
    </span>
  );
};
