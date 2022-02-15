import React from 'react';

const TodoItem = (props) => {
    return (
        <li>
            {props.title}
        </li>
    );
};

export default TodoItem;