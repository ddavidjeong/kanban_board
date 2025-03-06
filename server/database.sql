CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)


);




CREATE TABLE columns (
    column_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "order" FLOAT NOT NULL
);

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    parent_column_id INT NOT NULL REFERENCES columns(column_id),
    description TEXT,
    "order" FLOAT NOT NULL

);

INSERT INTO columns (title, "order") VALUES
('Todo', 1.0),
('Done', 2.0);

INSERT INTO cards (parent_column_id, description, "order") VALUES
    ((SELECT column_id FROM columns WHERE title = 'Todo'), 'Kanban Board Drag & Drop Feature', 1.0),
    ((SELECT column_id FROM columns WHERE title= 'Todo'), 'Finish CTech Application', 2.0),
    ((SELECT column_id FROM columns WHERE title = 'Todo'), 'Do some LC problems', 3.0),
    ((SELECT column_id FROM columns WHERE title = 'Done'), 'Make some Coffee', 1.0);