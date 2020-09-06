import React, { useState } from "react";
import "./App.css";

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

import {v4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([
    {
      id: v4(),
      title: "Take out the trash",
      completed: false,
    },
    {
      id: v4(),
      title: "Do dinner",
      completed: false,
    },
    {
      id: v4(),
      title: "Learn react",
      completed: true,
    },
  ]);

  const markComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodo = (title) => {
    const newTodo = {
      id: v4(),
      title,
      completed: false
    }
    setTodos(
      [...todos, newTodo]
    )
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <AddTodo addTodo={addTodo}/>
        <Todos todos={todos} markComplete={markComplete} delTodo={delTodo} />
      </div>
    </div>
  );
}

export default App;
