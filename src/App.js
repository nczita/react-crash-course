import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import About from './components/pages/About';

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

import { v4 } from "uuid";

function App(props) {
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
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route
            path="/"
            exact
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  markComplete={markComplete}
                  delTodo={delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
