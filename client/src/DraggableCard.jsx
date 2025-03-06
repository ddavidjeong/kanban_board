import React from "react";
import { useDraggable } from "@dnd-kit/core";

function DraggableCard({card_obj}) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: card_obj.card_id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        cursor: "grab",
      }
    : {
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        cursor: "grab",
      };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {card_obj.description}
    </div>
  );
}

export default DraggableCard;
