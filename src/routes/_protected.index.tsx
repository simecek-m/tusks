import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "page/Dashboard";

export const Route = createFileRoute("/_protected/")({
  component: Dashboard,
});
