import { store } from "react-notifications-component";

export function showDangerNotificationWithStatus(title = "Error", status = 0) {
  store.addNotification({
    title: title.toUpperCase(),
    message: `Status: ${status}`,
    type: "danger",
    container: "bottom-right",
    animationIn: ["animated", "bounceIn"],
    animationOut: ["animated", "bounceOut"],
    dismiss: {
      duration: 5000,
      click: true,
      pauseOnHover: true,
      waitForAnimation: true
    }
  });
}
