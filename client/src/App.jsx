import React, { useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div className="grid grid-cols-5 h-screen bg-slate-400">
      <div className="col-span-1"></div>
      <div className="col-span-3 pt-16">
        <div className="p-3 bg-slate-600 rounded-xl">
          <div className="text-white font-lg font-bold "> Todo List </div>
          <ListTodos />
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default App;
