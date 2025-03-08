import React from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function TaskCard({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: card.card_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f0f0f0",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} {...listeners}
    >
      {card.description}
    </div>
  );
}

export default TaskCard;
