import { useEffect, useState } from "react";
import List from "component/todo/List";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "page/ListPage.sass";
import { func } from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

export default function ListPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchTodos = async () => {
      const accessToken = await getAccessTokenSilently();
      fetch(`${process.env.REACT_APP_TODO_API_URL}/lists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setList(data));
    };
    fetchTodos();
  }, [getAccessTokenSilently]);

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
        {list.map((list) => (
          <List
            name={list.title}
            icon={list.icon ?? "list-check"}
            key={list._id}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`../${list._id}`);
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

ListPanel.propTypes = {
  onClick: func.isRequired,
};

function NewList({ onClick }) {
  return (
    <div className="new-list" onClick={onClick}>
      <FontAwesomeIcon icon="plus" size="2xl" />
    </div>
  );
}

NewList.propTypes = {
  onClick: func.isRequired,
};
