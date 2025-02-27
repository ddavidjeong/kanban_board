import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/todos`
      );
      const todos_json = await response.json();
      setTodos(todos_json);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return todos.map((todo) => (
    <TodoCard
      key={todo.todo_id}
      todo_id={todo.todo_id}
      description={todo.description}
    ></TodoCard>
  ));
}

export default ListTodos;
