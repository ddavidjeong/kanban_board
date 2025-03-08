// import React, { useState, useEffect } from "react";
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";

// import { useDraggable, useDroppable } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { CollisionPriority } from "@dnd-kit/abstract";
// import TaskCard from "./TaskCard";

// // droppable column component
// function Column({ column, cards }) {
//   const { setNodeRef } = useDroppable({
//     id: column.column_id,
//     collisionPriority: CollisionPriority.Low,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       className="p-3 mx-3 my-5 bg-slate-600 rounded-xl  w-[200px] "
//     >
//       <SortableContext
//         items={cards.map((card) => card.card_id)}
//         strategy={verticalListSortingStrategy}
//       >
//         <div className="text-white font-bold text-md">
//           {column.title}
//         </div>
//         {cards.map((card) => (
//           <TaskCard key={card.card_id} card={card} />
//         ))}
//       </SortableContext>
//     </div>
//   );
// }

// // Main App
// function App() {
//   const [columns, setColumns] = useState([]);
//   const [cards, setCards] = useState([]);
//   const sensors = useSensors(useSensor(PointerSensor));

//   useEffect(() => {
//     const fetchData = async () => {
//       const columnsResponse = await fetch(
//         "http://localhost:4000/columns"
//       );
//       const cardsResponse = await fetch(
//         "http://localhost:4000/cards"
//       );
//       const columnsData = await columnsResponse.json();
//       const cardsData = await cardsResponse.json();
//       setColumns(columnsData);
//       setCards(cardsData);
//     };
//     try {
//       fetchData();
//     } catch (error) {
//       console.log("failed to fetch data", error.message);
//     }
//   }, []);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     // if no collisions detected, over is null
//     // if detected, over.id = id of droppable container it's dragged onto
//     if (!over) {
//       return;
//     }
//     const activeCardId = active.id;
//     const activeCard = cards.find(
//       (card) => card.card_id === activeCardId
//     );

//     // activeCard's parent column id
//     const sourceColumnId = activeCard.parent_column_id;
//     // column id card is currently over
//     const targetColumnId = over.id;
//     const overColumn = columns.find(
//       (column) => column.column_id === targetColumnId
//     );

//     // columns haven't changed (reordering cards in the same column) -- TESTTSTSTS
//     if (sourceColumnId === targetColumnId) {
//       const columnCards = cards
//         .filter(
//           (c) => c.parent_column_id === sourceColumnId
//         )
//         .sort((a, b) => a.order - b.order);

//       setCards(columnCards);
//     }
//     /// UP TO HER
//     setCards((prev_cards) =>
//       prev_cards.map((card) =>
//         card.card_id === activeCardId
//           ? {
//               ...card,
//               parent_column_id: targetColumnId,
//             }
//           : card
//       )
//     );
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <div style={{ display: "flex", gap: "20px" }}>
//         {columns.map((column) => (
//           <Column
//             key={column.column_id}
//             column={column}
//             cards={cards
//               .filter(
//                 (card) =>
//                   card.parent_column_id === column.column_id
//               )
//               .sort((a, b) => a.order - b.order)}
//           />
//         ))}
//       </div>
//     </DndContext>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";


// Column Component
function Column({ column, cards }) {
  return (
    <div className="p-3 mx-3 my-5 bg-slate-600 rounded-xl w-[200px] ]">
      <div className="text-white font-bold text-md">{column.title}</div>
      <SortableContext
        items={cards.map((card) => card.card_id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((card) => (
          <TaskCard key={card.card_id} card={card} />
        ))}
      </SortableContext>
    </div>
  );
}

function App() {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnsResponse = await fetch("http://localhost:4000/columns");
        const cardsResponse = await fetch("http://localhost:4000/cards");
        const columnsData = await columnsResponse.json();
        const cardsData = await cardsResponse.json();
        setColumns(columnsData);
        setCards(cardsData);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeCardId = active.id; // Dragged card
    const overId = over.id;         // Could be a card or column

    // Find the active card and its current column
    const activeCard = cards.find((c) => c.card_id === activeCardId);
    const overCard = cards.find((c) => c.card_id === overId);
    const overColumn = columns.find((c) => c.column_id === overId);

    if (!activeCard) return;

    const sourceColumnId = activeCard.parent_column_id;
    let targetColumnId;

    if (overCard) {
      // Dropped over another card
      targetColumnId = overCard.parent_column_id;
    } else if (overColumn) {
      // Dropped over a column
      targetColumnId = overColumn.column_id;
    } else {
      return; // No valid drop target
    }

    if (sourceColumnId === targetColumnId) {
      // Reordering within the same column
      const columnCards = cards
        .filter((c) => c.parent_column_id === sourceColumnId)
        .sort((a, b) => a.order - b.order);
      const oldIndex = columnCards.findIndex((c) => c.card_id === activeCardId);
      const newIndex = overCard
        ? columnCards.findIndex((c) => c.card_id === overId)
        : columnCards.length - 1;

      if (oldIndex === newIndex) return;

      const newCards = [...cards];
      const reorderedCards = arrayMove(columnCards, oldIndex, newIndex);
      let prevOrder = 0;
      reorderedCards.forEach((card, index) => {
        card.order = prevOrder + 1;
        prevOrder = card.order;
        const cardIndex = newCards.findIndex((c) => c.card_id === card.card_id);
        newCards[cardIndex] = card;
      });
      setCards(newCards);
    } else {
      // Moving to a different column
      setCards((prev) =>
        prev.map((card) =>
          card.card_id === activeCardId
            ? { ...card, parent_column_id: targetColumnId }
            : card
        )
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((column) => (
          <Column
            key={column.column_id}
            column={column}
            cards={cards
              .filter((card) => card.parent_column_id === column.column_id)
              .sort((a, b) => a.order - b.order)}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default App;