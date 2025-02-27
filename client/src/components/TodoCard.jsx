import React, { useState } from "react";

function TodoCard({ todo_id, description }) {
  const [isEditMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/todos/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editedDescription }),
      });

      if (response.ok) {
        setEditMode(false);
      } else {
        console.error("Failed to update todo:", response.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditedDescription(description); // Start with current prop value
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedDescription(description); // Reset to prop value
  };

  return (
    <div className="grid grid-cols-9">
      <a className="col-span-8 p-6 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-100">
        {isEditMode ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-0 m-0 border-none focus:outline-none bg-transparent"
            autoFocus
          />
        ) : (
          <p
            className="font-normal text-black cursor-pointer"
            onClick={handleEditClick} // Click text to edit
          >
            {description}
          </p>
        )}
      </a>
      <div className="col-span-1 flex items-center gap-2">
        {isEditMode ? (
          <>
            <button
              className="bg-blue-500 opacity-60 hover:opacity-100 hover:border-white hover:border-2 rounded shadow-sm border border-gray-200 text-white p-2 duration-300"
              onClick={(e) => updateDescription(e)}
            >
              Save
            </button>
            <button
              className="bg-gray-500 opacity-60 hover:opacity-100 hover:border-white hover:border-2 rounded shadow-sm border border-gray-200 text-white p-2 duration-300"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-300 opacity-60 hover:opacity-100 hover:border-white hover:border-2 rounded shadow-sm border border-gray-200 text-white p-2 duration-300"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoCard;