import { useEffect } from "react";
import List from "component/todo/List";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "page/ListPage.sass";
import { func } from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

export default function ListPage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const { data, error, isLoading } = useQuery("todos", async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_TODO_API_URL}/lists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  });

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

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <div className="lists-layout">
      <ListPanel onClick={() => navigate("..")}>
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
      <FontAwesomeIcon icon="plus" size="lg" />
    </div>
  );
}

NewList.propTypes = {
  onClick: func.isRequired,
};
