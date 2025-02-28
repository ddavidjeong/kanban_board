import React, { useState } from "react";

function TodoCard({
  todo_id,
  description,
  updateTodo,
  onDelete,
}) {
  const [isEditMode, setEditMode] = useState(false);
  const [currentDescription, setNewDescription] =
    useState(description);

  const updateDescription = async (e) => {
    e.preventDefault();
    if (!currentDescription.trim()) {
      console.log("Description cannot be empty!");
      return; // Don't save or exit edit mode
    }
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
        setTimeout(() => setEditMode(false), 100);
        // update function in parent component so description stays consistent without rerender
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

  const deleteTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/todos/${todo_id}`,
        {
          method: "DELETE",
        }
      );

      console.log("DELETE!!!");
      console.log(response);
      onDelete(todo_id);
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
          <div className="relative">
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
              required
            ></textarea>

            <div className="absolute top-0 right-0">
              <button
                // DELETE BUTTON
                onClick={deleteTodo}
                className="bg-red-400 rounded-4xl p-1  text-white hover:bg-red-600 focus:outline-none focus:ring-2 duration-200 "
              >
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="font-normal text-left text-black cursor-pointer"
            onClick={() => setTimeout(() => setEditMode(true), 100)}
          >
            <div className="pr-2">
              <input type="checkbox" /> 
            </div>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
