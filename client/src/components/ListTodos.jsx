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

  const updateTodo = (todo_id, newDescription) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === todo_id
          ? { ...todo, description: newDescription }
          : todo
      )
    );
  };
  const handleDelete = (todo_id) => {
    setTodos(todos.filter(todo => todo.todo_id != todo_id))
  }

  useEffect(() => {
    getTodos();
  }, []);

  return todos.map((todo) => (
    <TodoCard
      key={todo.todo_id}
      todo_id={todo.todo_id}
      description={todo.description}
      updateTodo={updateTodo}
      onDelete = {handleDelete}
    ></TodoCard>
  ));
}

export default ListTodos;
