import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-3 mx-3 h-screen bg-slate-600 rounded-xl text-white ${ isOver ? 'bg-white':''}`}
    >
      {props.children}
    </div>
  );
}

export default Droppable;
