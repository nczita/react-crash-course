import React, { useState } from "react";
import PropTypes from 'prop-types';


function AddTodo(props) {
  const [title, setTitle] = useState("");

  const onChange = (e) => setTitle(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    props.addTodo(title);
    setTitle("");
  };

  return (
    <form style={{ display: "flex" }} onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Add Todo ..."
        value={title}
        onChange={onChange}
        style={{ flex: "10", padding: "10px" }}
      />
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: "1" }}
      />
    </form>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo;
