import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import DraggableCard from "./DraggableCard";

// droppable column component
function Column({ column, cards }) {
  const { setNodeRef } = useDroppable({
    id: column.column_id,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-3 mx-3 my-5  bg-slate-600 rounded-xl  w-[200px] "
    >
      <div className="text-white font-bold text-md">
        {column.title} 
      </div>

      {cards.map((card) => (
        <DraggableCard
          key={card.card_id}
          card_obj={card}
        ></DraggableCard>
      ))}
    </div>
  );
}

// Main App
function App() {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const columnsResponse = await fetch(
        "http://localhost:4000/columns"
      );
      const cardsResponse = await fetch(
        "http://localhost:4000/cards"
      );
      const columnsData = await columnsResponse.json();
      const cardsData = await cardsResponse.json();
      setColumns(columnsData);
      setCards(cardsData);
      
    };
    fetchData();
    // try {
    //   fetchData();
    // } catch (error) {
    //   console.log("failed to fetch data", error.message);
    // }
  }, []);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    // if no collisions detected, over is null
    // if detected, over.id = id of droppable container it's dragged onto
    if (!over) {
      return;
    }
    const cardId = active.id;
    const droppable_column_id = over.id;

    setCards((prev_cards) =>
      prev_cards.map((card) =>
        card.card_id === cardId
          ? {
              ...card,
              parent_column_id: droppable_column_id,
            }
          : card
      )
    );
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div style={{ display: "flex", gap: '20px' }}>
        {columns.map((column) => (
          <Column
            key={column.column_id}
            column={column}
            cards={cards.filter(
              (card) =>
                card.parent_column_id === column.column_id
            )}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default App;

// import React, { useState } from "react";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
// import { DndContext } from "@dnd-kit/core";
// import Droppable from "./components/Droppable";
// import Draggable from "./components/Draggable";

// function App() {
//   // const [isDropped, setIsDropped] = useState(false);

//   const draggableMarkup = <Draggable>drag me</Draggable>;

//   const handleDragEnd = (e) => {
//     const { over } = e;
//     setParent(over ? over.id : null);
//   };

//   return (
//     <div className="grid grid-cols-5 h-screen bg-slate-400">
//       <div className="col-span-1"></div>
//       <div className="col-span-3 pt-16">
//         <div className="p-3 bg-slate-600 rounded-xl">
//           <div className="text-white font-lg font-bold ">
//             Todo List
//           </div>

//           <ListTodos />
//         </div>

//         <div className="p-3 mt-10 bg-slate-600 rounded-xl">
//           <div className="text-white font-lg font-bold ">
//             Draggable
//           </div>
//           <DndContext onDragEnd={handleDragEnd}>

//               <DndContext onDragEnd={handleDragEnd}>

//             {parent === null ? draggableMarkup : null}
//             {containers.map((id) => (
//               // We updated the Droppable component so it would accept an `id`
//               // prop and pass it to `useDroppable`
//               <Droppable key={id} id={id}>
//                 {parent === id
//                   ? draggableMarkup
//                   : "Drop here"}
//               </Droppable>
//             ))}

//           </DndContext>
//           </DndContext>

//         </div>

//       </div>
//       <div className="col-span-1"></div>
//     </div>
//   );
// }

// export default App;
