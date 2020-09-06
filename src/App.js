import React, { useState } from 'react';
import './App.css';

import Todos from './components/Todos';

function App() {

  const [todos, setTodos] = useState(
    [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Do dinner',
        completed: false
      },
      {
        id: 3,
        title: 'Learn react',
        completed: true
      }
    ]
  );

  const markComplete = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })      
    )
  }

  const delTodo = (id) => {
    setTodos(
      [...todos.filter(todo => todo.id !== id)]
    )
  }

  return (
    <div className="App">
      <Todos todos={todos} markComplete={markComplete} delTodo={delTodo}/>
    </div>  
  );
}

export default App;
