import React, { useState, useEffect } from "react";

function EditTodo(todo_object) {
  const [todoId, setTodoId] = useState(todo_object.todo_id);
  const [description, setDescription] = useState(todo_object.description);

const handleClick = () => {
    try {
        const todo = todo_object;
  
        console.log(todo);
      } catch (error) {
        console.log(error.message);
      }
    
};


  return (
    <button
      className="bg-blue-500 rounded shadown-sm border border-gray-200 text-white"
      onClick={handleClick}
    >
      Edit
    </button>
  );
}

export default EditTodo;
