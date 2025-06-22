import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { UserProfileProvider } from "provider/UserProfileProvider";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      return redirect({ to: "/home", replace: true });
    }
  },
  component: () => (
    <UserProfileProvider>
      <Outlet />
    </UserProfileProvider>
  ),
});
