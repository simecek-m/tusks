import Topbar from "component/layout/Topbar";
import { Outlet } from "react-router-dom";
import "page/Page.sass";

export default function Page() {
  return (
    <>
      <Topbar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}
