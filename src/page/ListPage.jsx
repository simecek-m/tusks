import { useEffect } from "react";
import TodoListItem from "component/todo/TodoListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useTodoApi } from "hooks/api";
import NewList from "component/button/NewList";
import styles from "page/ListPage.module.sass";

export default function ListPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("..");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [navigate]);

  return (
    <div id={styles.layout}>
      <ListPanel />
      <Outlet />
    </div>
  );
}

function ListPanel() {
  const { fetchTodos } = useTodoApi();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("todos", fetchTodos);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <div id={styles["list-panel"]}>
      <NewList />
      {data &&
        data.map((list) => (
          <TodoListItem
            name={list.title}
            icon={list.icon ?? "list-check"}
            key={list.id}
            onClick={(e) => {
              navigate(`../${list.id}`);
            }}
          />
        ))}
    </div>
  );
}
