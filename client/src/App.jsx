import React, { useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div className="grid grid-cols-5 h-screen bg-gray-300">
      <div className="col-span-1"></div>
      <div className="col-span-3 pt-16">
        <div className="text-center text-5xl text-gray-600">
          Todo List
        </div>
        <div className="text-center">
          <div className="pt-10">
            <InputTodo />
          </div>
          <div className="pt-20">
            <ListTodos />
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default App;
