import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexibleContent from "component/layout/FlexibleContent";
import Task from "component/task/Task";
import { useTodoApi } from "hooks/api";
import { useKeyPress } from "hooks/interaction";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "page/ListDetailPage.module.sass";
import NewTask from "component/task/NewTask";

export default function ListDetailPage() {
  let { id } = useParams();
  const { deleteTodo, createTask, deleteTask, fetchTodoById } = useTodoApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: list,
    error,
    isLoading,
  } = useQuery(["todos", id], () => fetchTodoById(id));

  const createNewTaskMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", id]);
    },
    onError: (response) => {
      toast.error(
        <div>
          {response.statusText} (status: {response.status})
        </div>
      );
    },
  });

  const deleteListMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      navigate("..");
      queryClient.invalidateQueries("todos");
    },
    onError: (response) => {
      toast.error(
        <div>
          {response.statusText} (status: {response.status})
        </div>
      );
    },
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", id]);
    },
    onError: (response) => {
      toast.error(
        <div>
          {response.statusText} (status: {response.status})
        </div>
      );
    },
  });

  const navigateUp = () => navigate("..");
  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Escape",
    navigateUp
  );

  useEffect(() => {
    addOnKeyDownEvent();
    return () => {
      removeOnKeyDownEvent();
    };
  }, [addOnKeyDownEvent, removeOnKeyDownEvent]);

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;
  if (!list) return <div>Missing list</div>;

  return (
    <FlexibleContent flexDirection="column">
      <h1>{list.title}</h1>
      <div id={styles["delete-button"]}>
        <FontAwesomeIcon
          icon="trash"
          onClick={() => deleteListMutation.mutate(id)}
        />
      </div>
      <NewTask
        onFocus={removeOnKeyDownEvent}
        onBlur={addOnKeyDownEvent}
        onCreate={(task) => createNewTaskMutation.mutate({ listId: id, task })}
      />
      <div id={styles.tasks}>
        {list.tasks.map((task, index) => (
          <Task
            key={index}
            text={task.text}
            id={task.id}
            completed={task.completed}
            onDelete={(taskId) =>
              deleteTaskMutation.mutate({ listId: id, taskId })
            }
          />
        ))}
      </div>
    </FlexibleContent>
  );
}
