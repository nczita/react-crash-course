import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {

    const getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '4px',
            borderBottom: '1px #ccc dotted',
            textDecoration: props.todo.completed ? 'line-through' : 'none'
        }
    }

    const {id, title, completed} = props.todo;

    return (
        <div style={getStyle()}>
            <p>
                <input type='checkbox' defaultChecked={completed} onChange={() => props.markComplete(id)}/>
                {title}
                <button style={btnStyle} onClick={() => props.delTodo(id)}>x</button>
            </p>
        </div>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
