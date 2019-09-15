import React from 'react';
import TodoListWidget from 'component/TodoListWidget';
import UserWidget from 'component/UserWidget';
import { connect } from 'react-redux';
import api, { setAuthorizationHeader } from 'api';

class Todos extends React.Component {
  state = {
    list: []
  }

  componentDidMount() {
    api.get('/todos', setAuthorizationHeader(this.props.user))
      .then(response => 
        this.setState({
          list: response.data
        })
      )
      .catch(error => console.error(error));
  }

  render() {
    const items = this.state.list.map( item => <TodoListWidget key={item._id} title={item.title} count={item.tasks.length}/>);

    return (
      <div>
        <UserWidget />
        <h1 className="title">React-To-Do</h1>
        { items }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Todos);