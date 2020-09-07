import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./components/pages/About";

import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

import axios from "axios";

import { v4 } from "uuid";

const App = () => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => setTodos(res.data));
  }, []);

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
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => setTodos([...todos.filter((todo) => todo.id !== id)]));
  };

  const addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
        id: v4(),
      })
      .then((res) =>
        setTodos([
          ...todos,
          {
            id: v4(),
            title: res.data.title,
            completed: res.data.completed,
          },
        ])
      );
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
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
};

export default App;
