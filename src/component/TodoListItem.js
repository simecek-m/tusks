import React from 'react';

import './TodoListItem.sass';
import trash from '../assets/image/trash.svg'

function TodoListItem(props){
	const { title, count } = props;
	return (
		<div class="container">
			<div class="list-item">
				<span class="list-title">{ title }</span>
				<span class="list-count">({ count })</span>
			</div>
			<img class="icon-trash" src={ trash }/>
		</div>
	)
}

export default TodoListItem;