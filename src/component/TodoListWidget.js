import React from 'react';

import './TodoListWidget.sass';
import trash from '../assets/image/trash.svg'

function TodoListWidget({ title, count }){
  return (
    <div class="container">
      <div class="list-item">
        <span class="list-title">{ title }</span>
        <span class="list-count">({ count })</span>
      </div>
      <img class="icon-trash" src={ trash } alt="trash"/>
    </div>
  )
}

export default TodoListWidget;