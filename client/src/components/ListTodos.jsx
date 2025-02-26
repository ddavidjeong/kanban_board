import React, { useEffect, useState } from "react";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/todos"
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

  console.log(todos);

  return (
    <table className="w-full bg-white border border-black">
      <tbody>
        <tr>
          <th>Current Todos </th>
        </tr>
        {todos.map((todo) => (
          <tr>
            <td className="py-3">{todo.description} e</td>
            <td> edit</td>
            <td> delete</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTodos;
