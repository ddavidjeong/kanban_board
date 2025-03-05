import { React, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

function Home() {
  const [isDropped, setIsDropped] = useState(false);
  

  return (
    <DndContext>
      <div className="grid grid-cols-3 ">
        <div className="col-span-1 ">
          <Droppable></Droppable>
        </div>
        <div className="col-span-1">
          <Droppable></Droppable>
        </div>
        <div className="col-span-1">
          <Droppable></Droppable>
        </div>
      </div>
    </DndContext>
  );
}

export default Home;
