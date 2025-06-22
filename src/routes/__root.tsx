import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NotFound } from "page/NotFound";

export type RouterContext = {
  auth: {
    isAuthenticated: boolean;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  ),
  notFoundComponent: NotFound,
});
