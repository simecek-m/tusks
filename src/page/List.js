import Button from "component/button/Button";
import PageWithHeader from "component/layout/PageWithHeader";
import { connect } from "react-redux";
import { logout } from "store/actions";
import "page/List.sass";

function ListsPage({ logout }) {
  return (
    <PageWithHeader>
      <div className="lists-layout">
        <h1>List</h1>
        <Button onClick={logout}>logout</Button>
      </div>
    </PageWithHeader>
  );
}

export default connect(null, { logout })(ListsPage);
