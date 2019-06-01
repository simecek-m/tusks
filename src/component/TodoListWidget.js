import React from 'react';

import './TodoListWidget.sass';
import trash from '../assets/image/trash.svg'

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