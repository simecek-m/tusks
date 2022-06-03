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
  };
}
