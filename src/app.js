const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }

  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: 'todo not found' });
  }

  res.status(200).json(todo);
});

module.exports = app;
