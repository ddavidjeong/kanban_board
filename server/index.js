const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

// insert item
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
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
