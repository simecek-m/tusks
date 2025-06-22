import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "page/Settings";

export const Route = createFileRoute("/_protected/settings")({
  component: Settings,
});
