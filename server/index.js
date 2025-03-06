const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

// get all cards
app.get("/cards", async (req, res) => {
  try {
    const card_result = await pool.query(
      "SELECT * FROM cards"
    );
    res.json(card_result.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get all columns
app.get("/columns", async (req, res) => {
  try {
    const column_result = await pool.query(
      "SELECT * FROM columns"
    );
    res.json(column_result.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// insert new card
app.post("/cards", async (req, res) => {
  try {
    const { parent_column_id, description, rank } =
      req.body;

    if (!parent_column_id || !rank) {
      return res.status(400).json({error: "missing required input values"})
    };
    
    const newCard = await pool.query(
      "INSERT INTO cards (parent_column_id, description, rank) VALUES ($1, $2, $3) RETURNING *",
      [parent_column_id, description, rank]
    );
  
    res.json(newCard.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all items
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get single item
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const new_description = req.body.description;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [new_description, id]
    );
    res.json("todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del_todo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );

    res.json("todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
