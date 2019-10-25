import { store } from "react-notifications-component";
import i18n from "i18n";

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

export function showUnsupportedFeatureNotification() {
  store.addNotification({
    title: i18n.t("notification.unsupportedFeature"),
    message: i18n.t("notification.unsupportedFeatureDescription"),
    type: "warning",
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
