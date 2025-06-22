import { TodoPreview } from "component/todo/TodoPreview";
import { FC, useState } from "react";
import { Todo } from "type";

interface TodoListPreviewProps {
  title: string;
  todos: Array<Todo>;
  tag: string;
}

export const TodoListPreview: FC<TodoListPreviewProps> = ({
  title,
  todos,
  tag,
}) => {
  const [state, setState] = useState<Array<Todo>>(todos);
  return (
    <div className="bg-surface-light dark:bg-surface-dark relative flex w-full min-w-[300px] flex-col gap-4 rounded-xl p-8 drop-shadow-xs">
      <div className="text-3xl font-black">{title}</div>
      <div>
        {state.map(({ isCompleted, label }, index) => (
          <TodoPreview
            isCompleted={isCompleted}
            label={label}
            key={index}
            onChange={(isCompleted) =>
              setState((original) => {
                const result = [...original];
                result[index].isCompleted = isCompleted;
                return result;
              })
            }
          />
        ))}
        <span className="bg-brand-light dark:bg-brand-dark absolute -top-2 -right-2 rounded-md px-3 py-1 text-sm text-white dark:text-black">
          #{tag}
        </span>
      </div>
    </div>
  );
};
