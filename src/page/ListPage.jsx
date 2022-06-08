import { useEffect } from "react";
import TodoListItem from "component/todo/TodoListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useTodoApi } from "hooks/api";
import NewList from "component/button/NewList";
import styles from "page/ListPage.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  if (isLoading)
    return (
      <SidePanel>
        <div className={styles.centered}>
          <FontAwesomeIcon icon="spinner" size="xl" />
          <span>Loading</span>
        </div>
      </SidePanel>
    );
  if (error)
    return (
      <SidePanel>
        <div className={styles.centered}>
          <FontAwesomeIcon icon="triangle-exclamation" size="xl" />
          <span>Error</span>
        </div>
      </SidePanel>
    );

  return (
    <SidePanel>
      <NewList />
      {data &&
        data.map((list) => (
          <TodoListItem
            name={list.title}
            icon={list.icon ?? "list-check"}
            key={list.id}
            onClick={() => {
              navigate(`../${list.id}`);
            }}
          />
        ))}
    </SidePanel>
  );
}

function SidePanel({ children }) {
  return <div id={styles["side-panel"]}>{children}</div>;
}
