import { useEffect } from "react";
import List from "component/todo/List";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "page/ListPage.sass";

const LISTS = [
  {
    id: 1,
    name: "Work",
    icon: "code",
  },
  {
    id: 2,
    name: "Shopping",
    icon: "shopping-basket",
  },
  {
    id: 3,
    name: "Finance",
    icon: "coins",
  },
];

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
      <ListPanel onClick={() => navigate("..")}>
        {LISTS.map((list) => (
          <List
            name={list.name}
            icon={list.icon}
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
      </ListPanel>
      <Outlet />
    </div>
  );
}

function ListPanel({ onClick, children }) {
  return (
    <div className="list-panel" onClick={onClick}>
      {children}
    </div>
  );
}

function NewList({ onClick }) {
  return (
    <div className="new-list" onClick={onClick}>
      <FontAwesomeIcon icon="plus" size="2xl" />
    </div>
  );
}
