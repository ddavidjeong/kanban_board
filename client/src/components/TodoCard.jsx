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
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditMode ? "h-32" : "h-6"
          }`}
        >
          {isEditMode ? (
            <div className="relative h-full">
              <textarea
                //FORM
                rows="5"
                value={currentDescription}
                onChange={(e) =>
                  setNewDescription(e.target.value)
                }
                // onBlur={updateDescription}
                onKeyDown={handleKeyDown}
                className="w-full h-full border-none focus:outline-none bg-transparent resize-none"
                autoFocus
                required
              ></textarea>
              <div className="absolute top-0 right-0 z-10">
                <button
                  // DELETE BUTTON
                  onClick={deleteTodo}
                  className="bg-red-400 rounded-full p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 duration-200"
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
              <div className="absolute top-6 right-0 z-10">
                <button
                  //SAVE BUTTON
                  onClick={updateDescription}
                  className="bg-green-400 rounded-full p-1 text-white hover:bg-green-600 focus:outline-none focus:ring-2 duration-200"
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
                      // M10 18L18 6 M4 10L10 18
                      d="  M6 12L10 16L18 8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div
              className="font-normal text-left text-black cursor-pointer flex items-center h-full"
              onClick={() =>
                setTimeout(() => setEditMode(true), 100)
              }
            >
              <div className="flex pr-2">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer  appearance-none rounded-full bg-slate-100 shadow hover:shadow-md hover:bg-green-500  duration-300
                  border border-slate-400 hover:border-slate-200
                  
                  checked:bg-green-600 checked:border-green-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
