import { useEffect } from "react";
import List from "component/todo/List";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "page/ListPage.sass";
import { func } from "prop-types";
import { useQuery } from "react-query";
import { useTodoApi } from "hooks/api";

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
    <div className="lists-layout">
      <ListPanel onClick={() => navigate("..")} />
      <Outlet />
    </div>
  );
}

function ListPanel({ onClick }) {
  const { fetchTodos } = useTodoApi();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("todos", fetchTodos);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <div className="list-panel" onClick={onClick}>
      {data &&
        data.map((list) => (
          <List
            name={list.title}
            icon={list.icon ?? "list-check"}
            key={list.id}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`../${list.id}`);
            }}
          />
        ))}
      <NewList
        onClick={(e) => {
          e.stopPropagation();
          navigate("../new");
        }}
      />
    </div>
  );
}

ListPanel.propTypes = {
  onClick: func.isRequired,
};

function NewList({ onClick }) {
  return (
    <div className="new-list" onClick={onClick}>
      <FontAwesomeIcon icon="plus" size="lg" />
    </div>
  );
}

NewList.propTypes = {
  onClick: func.isRequired,
};
