import React, { useState } from "react";

function TodoCard({ todo_id, description, updateTodo }) {
  const [isEditMode, setEditMode] = useState(false);
  const [currentDescription, setNewDescription] =
    useState(description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/todos/${todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: currentDescription,
          }),
        }
      );
      if (response.ok) {
        setEditMode(false);
        // update function in parent class so description stays consistent without rerender
        updateTodo(todo_id, currentDescription);
      } else {
        console.error(
          "Failed to update todo:",
          response.status
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleKeyDown = (e) => {
    
    try {
      if (e.key == "Escape") {
        updateDescription(e);
      } 
    //   else if (e.key == "Escape") {
    //     setEditMode(false);
    //   }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="grid grid-cols-9">
      <div className="col-span-9 p-1 mt-2 bg-white border border-gray-200 outline-2 outline-transparent rounded shadow-sm hover:outline-blue-500 hover:outline-2 hover:bg-gray-100 duration-200">
        {isEditMode ? (
          // INPUT BOX
          <textarea
            type="text"
            rows="5"
            value={currentDescription}
            onChange={(e) =>
              setNewDescription(e.target.value)
            }
            // onblur, and enter/return: current ways to update desc
            onBlur={(e) => updateDescription(e)}
            onKeyDown={handleKeyDown}
            className="w-full h-full border-none focus:outline-none bg-transparent"
            autoFocus
          />
        ) : (
          <div
            className="font-normal text-left text-black cursor-pointer"
            onClick={() => setEditMode(true)}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
