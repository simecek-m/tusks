// AppRouter.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Loading } from "page/Loading";
import { useEffect, useState } from "react";
import { routeTree } from "routeTree.gen";

export const router = createRouter({
  routeTree,
  context: undefined!,
});

const AppRouter = () => {
  const auth = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  if (auth.isLoading) return <Loading />;

  return (
    <RouterProvider
      router={router}
      context={{ auth: { isAuthenticated } }}
    ></RouterProvider>
  );
};

export default AppRouter;
