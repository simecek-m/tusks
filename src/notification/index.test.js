import {
  showDangerNotificationWithStatus,
  showUnsupportedFeatureNotification
} from "notification";
import { store } from "react-notifications-component";
import i18n from "i18n";

const TEST_NOT_FOUND_TITLE = "Not found";
const TEST_NOT_FOUND_STATUS = 404;

describe("notification", () => {
  beforeAll(() => {
    i18n.init();
  });

  test("should show default danger notification with status", () => {
    const storeSpy = jest.spyOn(store, "addNotification");
    showDangerNotificationWithStatus();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "ERROR",
        message: "Status: 0",
        type: "danger",
        container: "bottom-right",
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: expect.objectContaining({
          duration: 5000,
          click: true,
          pauseOnHover: true,
          waitForAnimation: true
        })
      })
    );
    storeSpy.mockRestore();
  });

  test(`should show danger notification with custom title and status ${TEST_NOT_FOUND_STATUS}`, () => {
    const storeSpy = jest.spyOn(store, "addNotification");
    showDangerNotificationWithStatus(
      TEST_NOT_FOUND_TITLE,
      TEST_NOT_FOUND_STATUS
    );
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: TEST_NOT_FOUND_TITLE.toUpperCase(),
        message: `Status: ${TEST_NOT_FOUND_STATUS}`,
        type: "danger",
        container: "bottom-right",
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: expect.objectContaining({
          duration: 5000,
          click: true,
          pauseOnHover: true,
          waitForAnimation: true
        })
      })
    );
    storeSpy.mockRestore();
  });

  test("should show unsupported feature notification", () => {
    const storeSpy = jest.spyOn(store, "addNotification");
    showUnsupportedFeatureNotification();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: i18n.t("notification.unsupportedFeature"),
        message: i18n.t("notification.unsupportedFeatureDescription"),
        type: "warning",
        container: "bottom-right",
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: expect.objectContaining({
          duration: 5000,
          click: true,
          pauseOnHover: true,
          waitForAnimation: true
        })
      })
    );
    storeSpy.mockRestore();
  });
});
