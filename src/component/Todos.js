import React from 'react';
import TodoListWidget from 'component/TodoListWidget';

class Todos extends React.Component {
  state = {
    list: [
      {
        id: 1,
        title: "work",
        tasks: 3
      },
      {
        id: 2,
        title: "email",
        tasks: 14
      },
      {
        id: 3,
        title: "friends",
        tasks: 6
      }
    ]
  }
  
  render() {
    const items = this.state.list.map( item => <TodoListWidget key={item.id} title={item.title} count={item.tasks}/>);

    return (
      <div>
        <h1 className="title">React-To-Do</h1>
        { items }
      </div>
    )
  }

}

export default Todos;