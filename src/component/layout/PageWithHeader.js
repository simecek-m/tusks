import Topbar from "component/layout/Topbar";

export default function PageWithHeader({ children }) {
  return (
    <>
      <Topbar />
      <div>{children}</div>
    </>
  );
}
