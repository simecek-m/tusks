import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexibleContent from "component/layout/FlexibleContent";
import Task from "component/task/Task";
import { useTodoApi } from "hooks/api";
import { useKeyPress } from "hooks/interaction";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "page/ListDetailPage.module.sass";
import NewTask from "component/task/NewTask";

export default function ListDetailPage() {
  let { id } = useParams();
  const { deleteTodo, createTask, deleteTask, fetchTodoById, updateTask } =
    useTodoApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [finishedTasks, setFinishedTasks] = useState([]);
  const [unFinishedTasks, setUnfinishedTasks] = useState([]);

  const {
    data: list,
    error,
    isLoading,
  } = useQuery(["todos", id], () => fetchTodoById(id), {
    onSuccess: (data) => {
      const completedTasks = [];
      const inCompleteTasks = [];
      data.tasks.forEach((task) => {
        if (task.completed) {
          completedTasks.push(task);
        } else {
          inCompleteTasks.push(task);
        }
      });
      setUnfinishedTasks(inCompleteTasks);
      setFinishedTasks(completedTasks);
    },
  });

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

  const updateTaskMutation = useMutation(updateTask, {
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
        <h2>
          Active
          <span>
            ({unFinishedTasks.length} / {list.tasks.length})
          </span>
        </h2>
        {unFinishedTasks.map((task) => (
          <Task
            key={task.id}
            text={task.text}
            id={task.id}
            completed={false}
            onStateChanged={(completed) =>
              updateTaskMutation.mutate({
                listId: id,
                taskId: task.id,
                completed,
              })
            }
            onDelete={(taskId) =>
              deleteTaskMutation.mutate({ listId: id, taskId })
            }
          />
        ))}
        <h2>
          Finished
          <span>
            ({finishedTasks.length} / {list.tasks.length})
          </span>
        </h2>
        {finishedTasks.map((task) => (
          <Task
            key={task.id}
            text={task.text}
            id={task.id}
            completed={true}
            onStateChanged={(completed) =>
              updateTaskMutation.mutate({
                listId: id,
                taskId: task.id,
                completed,
              })
            }
            onDelete={(taskId) =>
              deleteTaskMutation.mutate({ listId: id, taskId })
            }
          />
        ))}
      </div>
    </FlexibleContent>
  );
}
