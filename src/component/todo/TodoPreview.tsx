import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "helper/style";
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
      className="block w-fit cursor-pointer text-lg select-none"
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
      <span className={cn("ml-2", { "line-through opacity-50": isCompleted })}>
        {label}
      </span>
    </span>
  );
};
