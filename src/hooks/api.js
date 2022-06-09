const { useAuth0 } = require("@auth0/auth0-react");

export function useTodoApi() {
  const { getAccessTokenSilently } = useAuth0();

  const fetchTodos = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_TODO_API_URL}/lists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  };

  const createTodo = async (todoList) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_TODO_API_URL}/lists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoList),
      }
    );
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  };

  const deleteTodo = async (listId) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_TODO_API_URL}/lists/${listId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  };

  return {
    fetchTodos,
    createTodo,
    deleteTodo,
  };
}
