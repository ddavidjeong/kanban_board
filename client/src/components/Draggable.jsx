import React from "react";
import { useDraggable } from "@dnd-kit/core";

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: "draggable",
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="flex align-middle justify-center  bg-white rounded-2xl"
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}

export default Draggable;
