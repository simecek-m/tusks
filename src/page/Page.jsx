import Topbar from "component/layout/Topbar";
import { Outlet } from "react-router-dom";
import styles from "page/Page.module.sass";

export default function Page() {
  return (
    <>
      <Topbar />
      <div id={styles.layout}>
        <Outlet />
      </div>
    </>
  );
}
