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
    <form className="flex" onSubmit={onSubmitForm}>
      <input
        type="text"
        className="w-full h-14  bg-white text-black py-2 px-4 border border-black duration-200 rounded shadow-2xl"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        required
      />
      <button className="bg-white hover:bg-gray-100 text-black py-2 px-4 border border-black duration-200 rounded shadow-2xl">
        +
      </button>
    </form>
  );
}

export default InputTodo;
