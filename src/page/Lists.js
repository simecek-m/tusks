import Button from "component/button/Button";
import { connect } from "react-redux";
import { logout } from "store/actions";

function ListsPage({ logout }) {
  return (
    <div>
      <h1>List</h1>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}

export default connect(null, { logout })(ListsPage);
