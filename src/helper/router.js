import { history } from "router";

export function redirect(path = "/") {
  history.push(path);
}
