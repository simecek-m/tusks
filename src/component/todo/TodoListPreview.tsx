import { TodoPreview } from "component/todo/TodoPreview";
import { FC, useState } from "react";
import { Todo } from "type";

interface TodoListPreviewProps {
  title: string;
  todos: Array<Todo>;
}

export const TodoListPreview: FC<TodoListPreviewProps> = ({ title, todos }) => {
  const [state, setState] = useState<Array<Todo>>(todos);
  return (
    <div className="flex w-full min-w-[300px] flex-col gap-4 bg-surface-light p-8 drop-shadow-sm dark:bg-surface-dark">
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
      </div>
    </div>
  );
};
