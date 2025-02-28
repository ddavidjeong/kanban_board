import React, { useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        "http://localhost:4000/todos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
      //   console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="flex p-1 mt-2 bg-white border border-gray-200 outline-2 outline-transparent rounded shadow-sm hover:outline-blue-500 hover:outline-2 hover:bg-gray-100 duration-200"
      onSubmit={onSubmitForm}
    >
      <input
        type="text"
        className="w-full h-14 focus:outline-none"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        required
      />
      <button className="py-2 px-4 text-white bg-blue-700 opacity-70 hover:opacity-90 border border-gray-200 rounded shadow-md duration-200">
        +
      </button>
    </form>
  );
}

export default InputTodo;
