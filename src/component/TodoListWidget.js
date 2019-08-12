import React from 'react';
import trash from 'assets/image/trash.svg';
import 'component/TodoListWidget.sass';

function TodoListWidget({ title, count }){
  return (
    <div className="container">
      <div className="list-item">
        <span className="list-title">{ title }</span>
        <span className="list-count">({ count })</span>
      </div>
      <img className="icon-trash" src={ trash } alt="trash"/>
    </div>
  )
}

export default TodoListWidget;