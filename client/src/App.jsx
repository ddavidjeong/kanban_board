import React, { useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

function App() {
  // const [isDropped, setIsDropped] = useState(false);

  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable>drag me</Draggable>;

  const handleDragEnd = (e) => {
    const { over } = e;
    setParent(over ? over.id : null);
  };

  return (
    <div className="grid grid-cols-5 h-screen bg-slate-400">
      <div className="col-span-1"></div>
      <div className="col-span-3 pt-16">
        <div className="p-3 bg-slate-600 rounded-xl">
          <div className="text-white font-lg font-bold ">
            Todo List
          </div>

          <ListTodos />
        </div>
        <div className="p-3 mt-10 bg-slate-600 rounded-xl">
          <div className="text-white font-lg font-bold ">
            Draggable
          </div>

          <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}
            {containers.map((id) => (
              // We updated the Droppable component so it would accept an `id`
              // prop and pass it to `useDroppable`
              <Droppable key={id} id={id}>
                {parent === id
                  ? draggableMarkup
                  : "Drop here"}
              </Droppable>
            ))}
          </DndContext>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default App;
